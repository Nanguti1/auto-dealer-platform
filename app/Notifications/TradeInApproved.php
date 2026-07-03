<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\TradeInRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TradeInApproved extends Notification implements ShouldQueue
{
    public function __construct(public TradeInRequest $tradeIn)
    {
        $tradeIn->load('tradeInVehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Trade-In Request Approved')
            ->greeting('Great news!')
            ->line('Your trade-in request for your vehicle has been approved.')
            ->line("Trade-In ID: {$this->tradeIn->id}")
            ->line("Offer Amount: {$this->formatCurrency($this->tradeIn->offer_amount)}")
            ->action('View Trade-In Details', route('customer.trade-ins.show', $this->tradeIn->id))
            ->line('Please visit the dealership to complete the trade-in process.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Trade-In Approved',
            'message' => 'Your trade-in request has been approved.',
            'trade_in_id' => $this->tradeIn->id,
            'offer_amount' => $this->tradeIn->offer_amount,
            'action_url' => route('customer.trade-ins.show', $this->tradeIn->id),
        ];
    }

    protected function formatCurrency(?float $amount): string
    {
        if ($amount === null) {
            return 'N/A';
        }

        return '$'.number_format($amount, 2);
    }
}
