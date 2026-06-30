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
        return [
            'totalVehicles' => Vehicle::query()->count(),
            'availableVehicles' => Vehicle::query()->whereNull('sold_at')->count(),
            'reservedVehicles' => VehicleReservation::query()->count(),
            'soldVehicles' => Vehicle::query()->whereNotNull('sold_at')->count(),
            'customers' => Customer::query()->count(),
            'leads' => Lead::query()->count(),
            'reservations' => VehicleReservation::query()->count(),
            'financeApplications' => FinanceApplication::query()->count(),
            'tradeIns' => TradeInRequest::query()->count(),
            'imports' => VehicleImport::query()->count(),
        ];
    }

    public function recentActivity(int $limit = 4): array
    {
        $leadActivities = Lead::query()
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

        $reservationActivities = VehicleReservation::query()
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
