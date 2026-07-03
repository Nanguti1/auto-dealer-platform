<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\VehicleReservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationCancelled extends Notification implements ShouldQueue
{
    public function __construct(public VehicleReservation $reservation, public readonly string $reason = '')
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
            ->subject('Vehicle Reservation Cancelled')
            ->greeting('Regarding your vehicle reservation')
            ->line("Your reservation for the {$this->reservation->vehicle->title} has been cancelled.")
            ->line("Reservation ID: {$this->reservation->id}")
            ->when(! empty($this->reason), fn ($mail) => $mail->line("Reason: {$this->reason}"))
            ->line('If you have any questions or would like to make a new reservation, please contact us.')
            ->action('View Reservations', route('customer.reservations.index'));
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Reservation Cancelled',
            'message' => "Your reservation for {$this->reservation->vehicle->title} has been cancelled.",
            'reservation_id' => $this->reservation->id,
            'vehicle_id' => $this->reservation->vehicle_id,
            'reason' => $this->reason,
            'action_url' => route('customer.reservations.index'),
        ];
    }
}
