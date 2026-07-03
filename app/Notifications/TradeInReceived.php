<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\TradeInRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TradeInReceived extends Notification implements ShouldQueue
{
    public function __construct(public TradeInRequest $tradeIn) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Trade-In Request Received')
            ->greeting('New trade-in submission')
            ->line('A new trade-in request has been submitted.')
            ->line("Trade-In ID: {$this->tradeIn->id}")
            ->line("Customer: {$this->tradeIn->customer_name}")
            ->line("Vehicle: {$this->tradeIn->vehicle_year} {$this->tradeIn->vehicle_make} {$this->tradeIn->vehicle_model}")
            ->line("Mileage: {$this->tradeIn->mileage} miles")
            ->action('Review Trade-In', route('admin.trade-ins.show', $this->tradeIn->id))
            ->line('Please review the trade-in request and provide an assessment.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'New Trade-In Request',
            'message' => "New trade-in request from {$this->tradeIn->customer_name}",
            'trade_in_id' => $this->tradeIn->id,
            'customer_name' => $this->tradeIn->customer_name,
            'vehicle_year' => $this->tradeIn->vehicle_year,
            'vehicle_make' => $this->tradeIn->vehicle_make,
            'vehicle_model' => $this->tradeIn->vehicle_model,
            'action_url' => route('admin.trade-ins.show', $this->tradeIn->id),
        ];
    }
}
