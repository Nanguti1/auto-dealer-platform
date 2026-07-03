<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\CustomerRegistered;
use App\Events\FinanceApproved;
use App\Events\LeadAssigned;
use App\Events\ReservationCreated;
use App\Events\TradeInApproved;
use App\Notifications\FinanceApproved as FinanceApprovedNotification;
use App\Notifications\ReservationConfirmed;
use App\Notifications\TradeInApproved as TradeInApprovedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendNotification implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $eventClass = get_class($event);

            match ($eventClass) {
                CustomerRegistered::class => $this->handleCustomerRegistered($event),
                ReservationCreated::class => $this->handleReservationCreated($event),
                LeadAssigned::class => $this->handleLeadAssigned($event),
                FinanceApproved::class => $this->handleFinanceApproved($event),
                TradeInApproved::class => $this->handleTradeInApproved($event),
                default => Log::info("No notification handler for event: {$eventClass}"),
            };
        } catch (\Exception $e) {
            Log::error("Failed to send notification: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function handleCustomerRegistered(CustomerRegistered $event): void
    {
        $event->customer->user->notify(
            new \App\Notifications\CustomerRegistered
        );
        Log::info("Sent customer registration notification to: {$event->customer->user->email}");
    }

    private function handleReservationCreated(ReservationCreated $event): void
    {
        $event->reservation->user->notify(
            new ReservationConfirmed($event->reservation)
        );
        Log::info("Sent reservation confirmation notification to: {$event->reservation->user->email}");
    }

    private function handleLeadAssigned(LeadAssigned $event): void
    {
        Notification::route('mail', $event->lead->assignedUser->email)
            ->notify(new \App\Notifications\LeadAssigned($event->lead));
        Log::info("Sent lead assignment notification to: {$event->lead->assignedUser->email}");
    }

    private function handleFinanceApproved(FinanceApproved $event): void
    {
        $event->financeApplication->user->notify(
            new FinanceApprovedNotification($event->financeApplication)
        );
        Log::info("Sent finance approval notification to: {$event->financeApplication->user->email}");
    }

    private function handleTradeInApproved(TradeInApproved $event): void
    {
        $event->tradeInRequest->user->notify(
            new TradeInApprovedNotification($event->tradeInRequest)
        );
        Log::info("Sent trade-in approval notification to: {$event->tradeInRequest->user->email}");
    }
}
