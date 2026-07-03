<?php

declare(strict_types=1);

namespace App\Services\Dashboard;

use App\Models\Customer;
use App\Models\FinanceApplication;
use App\Models\Lead;
use App\Models\TradeInRequest;
use App\Models\Vehicle;
use App\Models\VehicleImport;
use App\Models\VehicleReservation;
use App\Services\Concerns\ManagesEloquentModels;

class DashboardService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Vehicle::class;
    }

    public function summary(): array
    {
        $user = auth()->user();

        // Optimize with single aggregated queries
        $vehicleStats = Vehicle::forBranch($user)
            ->selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN sold_at IS NULL THEN 1 ELSE 0 END) as available,
                SUM(CASE WHEN sold_at IS NOT NULL THEN 1 ELSE 0 END) as sold
            ')
            ->first();

        return [
            'totalVehicles' => (int) $vehicleStats->total,
            'availableVehicles' => (int) $vehicleStats->available,
            'reservedVehicles' => VehicleReservation::forBranchThrough($user, 'vehicle')->count(),
            'soldVehicles' => (int) $vehicleStats->sold,
            'customers' => Customer::forBranchThrough($user, 'user')->count(),
            'leads' => Lead::forBranchThrough($user, 'vehicle')->count(),
            'reservations' => VehicleReservation::forBranchThrough($user, 'vehicle')->count(),
            'financeApplications' => FinanceApplication::forBranchThrough($user, 'vehicle')->count(),
            'tradeIns' => TradeInRequest::forBranchThrough($user, 'vehicle')->count(),
            'imports' => VehicleImport::forBranchThrough($user, 'vehicle')->count(),
        ];
    }

    public function recentActivity(int $limit = 4): array
    {
        $user = auth()->user();

        // Optimize by selecting only needed columns
        $leadActivities = Lead::forBranchThrough($user, 'vehicle')
            ->select('id', 'first_name', 'last_name', 'created_at')
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function (Lead $lead) {
                return [
                    'id' => "lead-{$lead->getKey()}",
                    'title' => 'New lead received',
                    'description' => trim("{$lead->first_name} {$lead->last_name} submitted an inquiry."),
                    'timestamp' => optional($lead->created_at)->diffForHumans() ?: 'Just now',
                    'badge' => 'Lead',
                ];
            });

        $reservationActivities = VehicleReservation::forBranchThrough($user, 'vehicle')
            ->select('id', 'vehicle_id', 'created_at')
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function (VehicleReservation $reservation) {
                return [
                    'id' => "reservation-{$reservation->getKey()}",
                    'title' => 'Reservation created',
                    'description' => trim("Reservation for vehicle #{$reservation->vehicle_id} has been placed."),
                    'timestamp' => optional($reservation->created_at)->diffForHumans() ?: 'Just now',
                    'badge' => 'Reservation',
                ];
            });

        return collect([$leadActivities, $reservationActivities])
            ->flatten(1)
            ->sortByDesc('timestamp')
            ->take($limit)
            ->values()
            ->all();
    }

    public function charts(): array
    {
        $user = auth()->user();

        // Sales trend over the last 6 months - optimized with database aggregation
        $salesTrend = Vehicle::forBranch($user)
            ->whereNotNull('sold_at')
            ->where('sold_at', '>=', now()->subMonths(6))
            ->selectRaw('DATE_FORMAT(sold_at, "%b") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('sold_at')
            ->get()
            ->map(fn ($item) => ['name' => $item->month, 'value' => $item->count])
            ->toArray();

        // Ensure we have all 6 months even if no sales
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $monthName = now()->subMonths($i)->format('M');
            $existing = collect($salesTrend)->firstWhere('name', $monthName);
            $months[] = $existing ?? ['name' => $monthName, 'value' => 0];
        }

        // Inventory distribution - use single query for better performance
        $vehicleStats = Vehicle::forBranch($user)
            ->selectRaw('
                SUM(CASE WHEN sold_at IS NULL THEN 1 ELSE 0 END) as available,
                SUM(CASE WHEN sold_at IS NOT NULL THEN 1 ELSE 0 END) as sold
            ')
            ->first();

        $reservedCount = VehicleReservation::forBranchThrough($user, 'vehicle')->count();

        $distribution = [
            ['name' => 'Available', 'value' => (int) $vehicleStats->available],
            ['name' => 'Reserved', 'value' => $reservedCount],
            ['name' => 'Sold', 'value' => (int) $vehicleStats->sold],
        ];

        // Operations metrics - cached in real app, fine for now
        $operations = [
            ['name' => 'Customers', 'value' => Customer::forBranchThrough($user, 'user')->count()],
            ['name' => 'Leads', 'value' => Lead::forBranchThrough($user, 'vehicle')->count()],
            ['name' => 'Finance', 'value' => FinanceApplication::forBranchThrough($user, 'vehicle')->count()],
            ['name' => 'Trade-Ins', 'value' => TradeInRequest::forBranchThrough($user, 'vehicle')->count()],
        ];

        return [
            'sales' => $months,
            'distribution' => $distribution,
            'operations' => $operations,
        ];
    }
}
