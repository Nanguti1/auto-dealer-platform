<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\VehicleReservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationConfirmed extends Notification implements ShouldQueue
{
    public function __construct(public VehicleReservation $reservation)
    {
        $reservation->load('vehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Vehicle Reservation Confirmed')
            ->greeting('Your reservation has been confirmed')
            ->line("Your reservation for the {$this->reservation->vehicle->title} has been confirmed.")
            ->line("Reservation ID: {$this->reservation->id}")
            ->line("Reservation Date: {$this->reservation->reserved_at->format('F j, Y')}")
            ->line("Status: {$this->reservation->status}")
            ->action('View Reservation', route('customer.reservations.show', $this->reservation->id))
            ->line('Please arrive at the dealership at your scheduled time.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Reservation Confirmed',
            'message' => "Your reservation for {$this->reservation->vehicle->title} has been confirmed.",
            'reservation_id' => $this->reservation->id,
            'vehicle_id' => $this->reservation->vehicle_id,
            'reserved_at' => $this->reservation->reserved_at->toIso8601String(),
            'status' => $this->reservation->status,
            'action_url' => route('customer.reservations.show', $this->reservation->id),
        ];
    }
}
