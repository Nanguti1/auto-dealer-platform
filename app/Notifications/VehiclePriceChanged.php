<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VehiclePriceChanged extends Notification implements ShouldQueue
{
    public function __construct(public Vehicle $vehicle, public readonly float $oldPrice) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $priceDiff = $this->vehicle->sale_price - $this->oldPrice;
        $priceChange = $priceDiff < 0 ? 'decreased' : 'increased';
        $priceAmount = $this->formatCurrency(abs($priceDiff));

        return (new MailMessage)
            ->subject('Vehicle Price Update')
            ->greeting('Price update notification')
            ->line("The price for {$this->vehicle->title} has {$priceChange}.")
            ->line("Previous Price: {$this->formatCurrency($this->oldPrice)}")
            ->line("New Price: {$this->formatCurrency($this->vehicle->sale_price)}")
            ->line("Change: {$priceAmount}")
            ->action('View Vehicle', route('vehicles.show', $this->vehicle->slug))
            ->line('Contact us if you have any questions.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        $priceDiff = $this->vehicle->sale_price - $this->oldPrice;

        return [
            'title' => 'Vehicle Price Changed',
            'message' => "The price for {$this->vehicle->title} has changed.",
            'vehicle_id' => $this->vehicle->id,
            'vehicle_title' => $this->vehicle->title,
            'old_price' => $this->oldPrice,
            'new_price' => $this->vehicle->sale_price,
            'price_difference' => $priceDiff,
            'action_url' => route('vehicles.show', $this->vehicle->slug),
        ];
    }

    protected function formatCurrency(float $amount): string
    {
        return '$'.number_format($amount, 2);
    }
}
