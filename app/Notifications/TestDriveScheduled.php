<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\TestDriveBooking;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TestDriveScheduled extends Notification implements ShouldQueue
{
    public function __construct(public TestDriveBooking $booking)
    {
        $booking->load('vehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Test Drive Scheduled')
            ->greeting('Your test drive is confirmed')
            ->line("Your test drive for the {$this->booking->vehicle->title} has been scheduled.")
            ->line("Booking ID: {$this->booking->id}")
            ->line("Date: {$this->booking->scheduled_at->format('F j, Y')}")
            ->line("Time: {$this->booking->scheduled_at->format('g:i A')}")
            ->action('View Booking', route('customer.test-drives.show', $this->booking->id))
            ->line('Please arrive 15 minutes before your scheduled time.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Test Drive Scheduled',
            'message' => "Your test drive for {$this->booking->vehicle->title} is scheduled.",
            'booking_id' => $this->booking->id,
            'vehicle_id' => $this->booking->vehicle_id,
            'scheduled_at' => $this->booking->scheduled_at->toIso8601String(),
            'action_url' => route('customer.test-drives.show', $this->booking->id),
        ];
    }
}
