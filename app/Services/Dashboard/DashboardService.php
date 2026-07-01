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
}
