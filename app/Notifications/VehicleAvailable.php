<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VehicleAvailable extends Notification implements ShouldQueue
{
    public function __construct(public Vehicle $vehicle) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Vehicle Now Available')
            ->greeting('Good news!')
            ->line('The vehicle you were interested in is now available.')
            ->line("Vehicle: {$this->vehicle->title}")
            ->line("Price: {$this->formatCurrency($this->vehicle->sale_price)}")
            ->line("Mileage: {$this->vehicle->mileage} miles")
            ->action('View Vehicle', route('admin.vehicles.show', $this->vehicle->id))
            ->line('Contact us today to schedule a test drive!');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Vehicle Available',
            'message' => "The {$this->vehicle->title} is now available.",
            'vehicle_id' => $this->vehicle->id,
            'vehicle_title' => $this->vehicle->title,
            'price' => $this->vehicle->sale_price,
            'action_url' => route('admin.vehicles.show', $this->vehicle->id),
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
