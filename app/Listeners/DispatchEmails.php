<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\VehicleSold;
use App\Mail\VehicleSoldAdminNotification;
use App\Mail\VehicleSoldConfirmation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DispatchEmails implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $eventClass = get_class($event);

            match ($eventClass) {
                VehicleSold::class => $this->handleVehicleSold($event),
                default => Log::info("No email handler for event: {$eventClass}"),
            };
        } catch (\Exception $e) {
            Log::error("Failed to dispatch email: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function handleVehicleSold(VehicleSold $event): void
    {
        // Send confirmation email to buyer
        if ($event->vehicle->owner) {
            Mail::to($event->vehicle->owner->email)->send(
                new VehicleSoldConfirmation($event->vehicle)
            );
            Log::info("Sent vehicle sold confirmation to: {$event->vehicle->owner->email}");
        }

        // Send notification to dealership admin
        $adminEmail = config('mail.admin_email', 'admin@dealership.com');
        Mail::to($adminEmail)->send(
            new VehicleSoldAdminNotification($event->vehicle)
        );
        Log::info("Sent vehicle sold admin notification to: {$adminEmail}");
    }
}
