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

        // Use withCount for better performance on related counts
        return [
            'totalVehicles' => Vehicle::forBranch($user)->count(),
            'availableVehicles' => Vehicle::forBranch($user)->whereNull('sold_at')->count(),
            'reservedVehicles' => VehicleReservation::forBranchThrough($user, 'vehicle')->count(),
            'soldVehicles' => Vehicle::forBranch($user)->whereNotNull('sold_at')->count(),
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

        $leadActivities = Lead::forBranchThrough($user, 'vehicle')
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

        // Sales trend over the last 6 months - optimized with indexed query
        // Use database-agnostic date formatting
        $salesTrend = Vehicle::forBranch($user)
            ->whereNotNull('sold_at')
            ->where('sold_at', '>=', now()->subMonths(6))
            ->get()
            ->groupBy(fn ($vehicle) => $vehicle->sold_at->format('M'))
            ->map(fn ($vehicles, $month) => ['name' => $month, 'value' => $vehicles->count()])
            ->values()
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
