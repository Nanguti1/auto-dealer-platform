<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Reports;

use App\Http\Controllers\Controller;
use App\Models\FinanceApplication;
use App\Models\Lead;
use App\Models\Payment;
use App\Models\Report;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Report::class);

        $user = $request->user();

        $savedReports = Report::with('user')
            ->when($user, fn ($query) => $query->where('user_id', $user->id)->orWhereNull('user_id'))
            ->orderBy('is_favorite', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Optimize summary queries with single aggregated query
        $startDate = $request->query('start_date', now()->subDays(30));
        $endDate = $request->query('end_date', now());

        $paymentStats = Payment::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('COUNT(*) as total_sales, SUM(amount) as total_revenue')
            ->first();

        $leadStats = Lead::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('COUNT(*) as total_leads, SUM(CASE WHEN status = "converted" THEN 1 ELSE 0 END) as converted_leads')
            ->first();

        $conversionRate = $leadStats->total_leads > 0
            ? ($leadStats->converted_leads / $leadStats->total_leads) * 100
            : 0.0;

        return Inertia::render('Admin/Reports/Index', [
            'savedReports' => $savedReports,
            'summary' => [
                'totalSales' => (int) $paymentStats->total_sales,
                'totalRevenue' => (float) $paymentStats->total_revenue,
                'totalVehicles' => Vehicle::forBranch($user)->count(),
                'totalLeads' => (int) $leadStats->total_leads,
                'conversionRate' => $conversionRate,
                'avgFinanceAmount' => $this->getAvgFinanceAmount($request, $user),
            ],
        ]);
    }

    public function sales(Request $request): Response
    {
        $this->authorize('viewAny', Report::class);

        $user = $request->user();
        $startDate = $request->query('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->query('end_date', now()->toDateString());

        $salesData = Payment::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count, SUM(amount) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $salesByMake = Payment::forBranchThrough($user, 'vehicle')
            ->whereBetween('payments.created_at', [$startDate, $endDate])
            ->join('vehicles', 'payments.vehicle_id', '=', 'vehicles.id')
            ->join('makes', 'vehicles.make_id', '=', 'makes.id')
            ->selectRaw('vehicles.make_id, makes.name as make_name, COUNT(*) as count')
            ->groupBy('vehicles.make_id', 'makes.name')
            ->get();

        return Inertia::render('Admin/Reports/SalesReport', [
            'salesData' => $salesData,
            'salesByMake' => $salesByMake,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }

    public function inventory(Request $request): Response
    {
        $this->authorize('viewAny', Report::class);

        $user = $request->user();

        $inventoryData = Vehicle::forBranch($user)
            ->join('inventory_statuses', 'vehicles.inventory_status_id', '=', 'inventory_statuses.id')
            ->selectRaw('inventory_status_id, inventory_statuses.name as status_name, COUNT(*) as count, AVG(sale_price) as avg_price')
            ->groupBy('inventory_status_id', 'inventory_statuses.name')
            ->get();

        $inventoryByMake = Vehicle::forBranch($user)
            ->join('makes', 'vehicles.make_id', '=', 'makes.id')
            ->selectRaw('make_id, makes.name as make_name, COUNT(*) as count')
            ->groupBy('make_id', 'makes.name')
            ->get();

        $inventoryByBodyType = Vehicle::forBranch($user)
            ->join('body_types', 'vehicles.body_type_id', '=', 'body_types.id')
            ->selectRaw('body_type_id, body_types.name as body_type_name, COUNT(*) as count')
            ->groupBy('body_type_id', 'body_types.name')
            ->get();

        $agedInventory = Vehicle::forBranch($user)
            ->where('created_at', '<', now()->subDays(90))
            ->count();

        return Inertia::render('Admin/Reports/InventoryReport', [
            'inventoryData' => $inventoryData,
            'inventoryByMake' => $inventoryByMake,
            'inventoryByBodyType' => $inventoryByBodyType,
            'agedInventory' => $agedInventory,
        ]);
    }

    public function leads(Request $request): Response
    {
        $this->authorize('viewAny', Report::class);

        $user = $request->user();
        $startDate = $request->query('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->query('end_date', now()->toDateString());

        $leadsByStage = Lead::forBranchThrough($user, 'vehicle')
            ->join('crm_stages', 'leads.crm_stage_id', '=', 'crm_stages.id')
            ->selectRaw('crm_stage_id, crm_stages.name as stage_name, COUNT(*) as count')
            ->groupBy('crm_stage_id', 'crm_stages.name')
            ->get();

        $leadsBySource = Lead::forBranchThrough($user, 'vehicle')
            ->selectRaw('source, COUNT(*) as count')
            ->whereNotNull('source')
            ->groupBy('source')
            ->get();

        $conversionData = Lead::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total, SUM(CASE WHEN status = "converted" THEN 1 ELSE 0 END) as converted')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Reports/LeadReport', [
            'leadsByStage' => $leadsByStage,
            'leadsBySource' => $leadsBySource,
            'conversionData' => $conversionData,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }

    public function finance(Request $request): Response
    {
        $this->authorize('viewAny', Report::class);

        $user = $request->user();
        $startDate = $request->query('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->query('end_date', now()->toDateString());

        $financeData = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count, SUM(requested_amount) as total_requested, SUM(approved_amount) as total_approved')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $financeByStatus = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        $financeByLender = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->join('lenders', 'finance_applications.lender_id', '=', 'lenders.id')
            ->selectRaw('lender_id, lenders.name as lender_name, COUNT(*) as count')
            ->groupBy('lender_id', 'lenders.name')
            ->get();

        return Inertia::render('Admin/Reports/FinanceReport', [
            'financeData' => $financeData,
            'financeByStatus' => $financeByStatus,
            'financeByLender' => $financeByLender,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Report::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sales,inventory,lead,finance',
            'configuration' => 'required|array',
            'is_favorite' => 'boolean',
        ]);

        $report = Report::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return back()->with('success', 'Report saved successfully.');
    }

    public function destroy(Report $report)
    {
        $this->authorize('delete', $report);

        $report->delete();

        return back()->with('success', 'Report deleted successfully.');
    }

    public function export(Request $request)
    {
        $this->authorize('viewAny', Report::class);

        $type = $request->query('type');
        $format = $request->query('format', 'csv');

        $data = match ($type) {
            'sales' => $this->getSalesExportData($request),
            'inventory' => $this->getInventoryExportData(),
            'leads' => $this->getLeadsExportData($request),
            'finance' => $this->getFinanceExportData($request),
            default => throw new \InvalidArgumentException('Invalid report type'),
        };

        $filename = "{$type}_report_".now()->format('Y-m-d').".{$format}";

        return response($data)
            ->header('Content-Type', $format === 'csv' ? 'text/csv' : 'application/vnd.ms-excel')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }

    private function getAvgFinanceAmount(Request $request, ?User $user = null): float
    {
        return (float) FinanceApplication::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])->where('status', 'approved')->avg('approved_amount') ?? 0;
    }

    private function getSalesExportData(Request $request): string
    {
        $user = $request->user();
        $payments = Payment::forBranchThrough($user, 'vehicle')
            ->with(['vehicle', 'user'])
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])
            ->get();

        return $this->generateCsv($payments, [
            'Date' => fn ($payment) => $payment->created_at,
            'Customer' => fn ($payment) => $payment->user?->name ?? 'N/A',
            'Vehicle' => fn ($payment) => $payment->vehicle?->title ?? 'N/A',
            'Amount' => fn ($payment) => $payment->amount,
            'Payment Method' => fn ($payment) => $payment->method,
        ]);
    }

    private function getInventoryExportData(Request $request): string
    {
        $user = $request->user();
        $vehicles = Vehicle::forBranch($user)
            ->with(['make', 'vehicleModel', 'inventoryStatus'])
            ->get();

        return $this->generateCsv($vehicles, [
            'VIN' => fn ($vehicle) => $vehicle->vin,
            'Make' => fn ($vehicle) => $vehicle->make?->name ?? 'N/A',
            'Model' => fn ($vehicle) => $vehicle->vehicleModel?->name ?? 'N/A',
            'Year' => fn ($vehicle) => $vehicle->year,
            'Price' => fn ($vehicle) => $vehicle->sale_price,
            'Status' => fn ($vehicle) => $vehicle->inventoryStatus?->name ?? 'N/A',
            'Days in Stock' => fn ($vehicle) => $vehicle->created_at ? now()->diffInDays($vehicle->created_at) : 0,
        ]);
    }

    private function getLeadsExportData(Request $request): string
    {
        $user = $request->user();
        $leads = Lead::forBranchThrough($user, 'vehicle')
            ->with(['crmStage'])
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])
            ->get();

        return $this->generateCsv($leads, [
            'Date' => fn ($lead) => $lead->created_at,
            'Customer' => fn ($lead) => $lead->first_name.' '.$lead->last_name,
            'Source' => fn ($lead) => $lead->source,
            'Stage' => fn ($lead) => $lead->crmStage?->name ?? 'N/A',
            'Status' => fn ($lead) => $lead->status,
        ]);
    }

    private function getFinanceExportData(Request $request): string
    {
        $user = $request->user();
        $applications = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->with(['lender', 'user'])
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])
            ->get();

        return $this->generateCsv($applications, [
            'Date' => fn ($application) => $application->created_at,
            'Customer' => fn ($application) => $application->user?->name ?? 'N/A',
            'Requested Amount' => fn ($application) => $application->requested_amount,
            'Approved Amount' => fn ($application) => $application->approved_amount ?? 0,
            'Status' => fn ($application) => $application->status,
            'Lender' => fn ($application) => $application->lender?->name ?? 'N/A',
        ]);
    }

    /**
     * @param  Collection  $data
     * @param  array<string, callable>  $columns
     */
    private function generateCsv($data, array $columns): string
    {
        $headers = array_keys($columns);
        $csv = implode(',', $headers)."\n";

        foreach ($data as $item) {
            $row = [];
            foreach ($columns as $column) {
                $row[] = $column($item);
            }
            $csv .= implode(',', $row)."\n";
        }

        return $csv;
    }
}
