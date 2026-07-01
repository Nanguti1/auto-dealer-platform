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
use Illuminate\Support\Facades\DB;
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

        return Inertia::render('Admin/Reports/Index', [
            'savedReports' => $savedReports,
            'summary' => [
                'totalSales' => $this->getTotalSales($request, $user),
                'totalRevenue' => $this->getTotalRevenue($request, $user),
                'totalVehicles' => Vehicle::forBranch($user)->count(),
                'totalLeads' => Lead::forBranchThrough($user, 'vehicle')->count(),
                'conversionRate' => $this->getConversionRate($request, $user),
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
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $salesByMake = Vehicle::forBranch($user)
            ->whereHas('payments', fn ($query) => $query->whereBetween('created_at', [$startDate, $endDate]))
            ->with('make')
            ->select('make_id', DB::raw('COUNT(*) as count'))
            ->groupBy('make_id')
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
            ->select(
                'status',
                DB::raw('COUNT(*) as count'),
                DB::raw('AVG(price) as avg_price')
            )
            ->groupBy('status')
            ->get();

        $inventoryByMake = Vehicle::forBranch($user)
            ->with('make')
            ->select('make_id', DB::raw('COUNT(*) as count'))
            ->groupBy('make_id')
            ->get();

        $inventoryByBodyType = Vehicle::forBranch($user)
            ->with('bodyType')
            ->select('body_type_id', DB::raw('COUNT(*) as count'))
            ->groupBy('body_type_id')
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
            ->with('crmStage')
            ->select('crm_stage_id', DB::raw('COUNT(*) as count'))
            ->groupBy('crm_stage_id')
            ->get();

        $leadsBySource = Lead::forBranchThrough($user, 'vehicle')
            ->select('source', DB::raw('COUNT(*) as count'))
            ->whereNotNull('source')
            ->groupBy('source')
            ->get();

        $conversionData = Lead::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN status = "converted" THEN 1 ELSE 0 END) as converted')
            )
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
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(requested_amount) as total_requested'),
                DB::raw('SUM(approved_amount) as total_approved')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $financeByStatus = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $financeByLender = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->with('lender')
            ->select('lender_id', DB::raw('COUNT(*) as count'))
            ->groupBy('lender_id')
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

    private function getTotalSales(Request $request, ?User $user = null): int
    {
        return Payment::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])->count();
    }

    private function getTotalRevenue(Request $request, ?User $user = null): float
    {
        return (float) Payment::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])->sum('amount');
    }

    private function getConversionRate(Request $request, ?User $user = null): float
    {
        $totalLeads = Lead::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])->count();

        if ($totalLeads === 0) {
            return 0.0;
        }

        $convertedLeads = Lead::forBranchThrough($user, 'vehicle')
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])->where('status', 'converted')->count();

        return ($convertedLeads / $totalLeads) * 100;
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
            ->with(['vehicle', 'customer'])
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])
            ->get();

        $csv = "Date,Customer,Vehicle,Amount,Payment Method\n";
        foreach ($payments as $payment) {
            $customerName = $payment->customer ? $payment->customer->name : 'N/A';
            $vehicleTitle = $payment->vehicle ? $payment->vehicle->title : 'N/A';
            $csv .= "{$payment->created_at},{$customerName},{$vehicleTitle},{$payment->amount},{$payment->payment_method}\n";
        }

        return $csv;
    }

    private function getInventoryExportData(Request $request): string
    {
        $user = $request->user();
        $vehicles = Vehicle::forBranch($user)
            ->with(['make', 'model', 'status'])
            ->get();

        $csv = "VIN,Make,Model,Year,Price,Status,Days in Stock\n";
        foreach ($vehicles as $vehicle) {
            $daysInStock = $vehicle->created_at ? now()->diffInDays($vehicle->created_at) : 0;
            $makeName = $vehicle->make ? $vehicle->make->name : 'N/A';
            $modelName = $vehicle->model ? $vehicle->model->name : 'N/A';
            $csv .= "{$vehicle->vin},{$makeName},{$modelName},{$vehicle->year},{$vehicle->price},{$vehicle->status},{$daysInStock}\n";
        }

        return $csv;
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

        $csv = "Date,Customer,Source,Stage,Status\n";
        foreach ($leads as $lead) {
            $customerName = $lead->first_name.' '.$lead->last_name;
            $stageName = $lead->crmStage ? $lead->crmStage->name : 'N/A';
            $csv .= "{$lead->created_at},{$customerName},{$lead->source},{$stageName},{$lead->status}\n";
        }

        return $csv;
    }

    private function getFinanceExportData(Request $request): string
    {
        $user = $request->user();
        $applications = FinanceApplication::forBranchThrough($user, 'vehicle')
            ->with(['lender'])
            ->whereBetween('created_at', [
                $request->query('start_date', now()->subDays(30)),
                $request->query('end_date', now()),
            ])
            ->get();

        $csv = "Date,Customer,Requested Amount,Approved Amount,Status,Lender\n";
        foreach ($applications as $application) {
            $customerName = $application->user ? $application->user->name : 'N/A';
            $lenderName = $application->lender ? $application->lender->name : 'N/A';
            $approvedAmount = $application->approved_amount ?? 0;
            $csv .= "{$application->created_at},{$customerName},{$application->requested_amount},{$approvedAmount},{$application->status},{$lenderName}\n";
        }

        return $csv;
    }
}
