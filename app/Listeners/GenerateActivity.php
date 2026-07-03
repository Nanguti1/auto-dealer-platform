<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\CustomerRegistered;
use App\Events\LeadCreated;
use App\Events\ReservationCreated;
use App\Events\TradeInSubmitted;
use App\Events\VehicleCreated;
use App\Events\VehicleSold;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class GenerateActivity implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $user = Auth::user();
            $eventClass = get_class($event);

            $activityData = match ($eventClass) {
                VehicleCreated::class => $this->handleVehicleCreated($event, $user),
                VehicleSold::class => $this->handleVehicleSold($event, $user),
                ReservationCreated::class => $this->handleReservationCreated($event, $user),
                LeadCreated::class => $this->handleLeadCreated($event, $user),
                TradeInSubmitted::class => $this->handleTradeInSubmitted($event, $user),
                CustomerRegistered::class => $this->handleCustomerRegistered($event, $user),
                default => null,
            };

            if ($activityData) {
                Log::info('Activity Generated', $activityData);

                // Store in activities table if it exists
                // DB::table('activities')->insert([
                //     'user_id' => $user?->id,
                //     'activity_type' => $activityData['type'],
                //     'description' => $activityData['description'],
                //     'subject_type' => $activityData['subject_type'] ?? null,
                //     'subject_id' => $activityData['subject_id'] ?? null,
                //     'properties' => json_encode($activityData),
                //     'created_at' => now(),
                // ]);
            }
        } catch (\Exception $e) {
            Log::error("Failed to generate activity: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function handleVehicleCreated(VehicleCreated $event, ?object $user): array
    {
        return [
            'type' => 'vehicle_created',
            'description' => "Created vehicle: {$event->vehicle->vin}",
            'subject_type' => 'Vehicle',
            'subject_id' => $event->vehicle->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }

    private function handleVehicleSold(VehicleSold $event, ?object $user): array
    {
        return [
            'type' => 'vehicle_sold',
            'description' => "Sold vehicle: {$event->vehicle->vin} for \${$event->vehicle->sale_price}",
            'subject_type' => 'Vehicle',
            'subject_id' => $event->vehicle->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }

    private function handleReservationCreated(ReservationCreated $event, ?object $user): array
    {
        return [
            'type' => 'reservation_created',
            'description' => "Created reservation for vehicle: {$event->reservation->vehicle_id}",
            'subject_type' => 'VehicleReservation',
            'subject_id' => $event->reservation->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }

    private function handleLeadCreated(LeadCreated $event, ?object $user): array
    {
        return [
            'type' => 'lead_created',
            'description' => "Created lead: {$event->lead->name}",
            'subject_type' => 'Lead',
            'subject_id' => $event->lead->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }

    private function handleTradeInSubmitted(TradeInSubmitted $event, ?object $user): array
    {
        return [
            'type' => 'trade_in_submitted',
            'description' => "Submitted trade-in request for vehicle: {$event->tradeInRequest->vehicle_id}",
            'subject_type' => 'TradeInRequest',
            'subject_id' => $event->tradeInRequest->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }

    private function handleCustomerRegistered(CustomerRegistered $event, ?object $user): array
    {
        return [
            'type' => 'customer_registered',
            'description' => "New customer registered: {$event->customer->name}",
            'subject_type' => 'Customer',
            'subject_id' => $event->customer->id,
            'user_id' => $user?->id,
            'causer_type' => get_class($user) ?? null,
            'causer_id' => $user?->id,
        ];
    }
}
