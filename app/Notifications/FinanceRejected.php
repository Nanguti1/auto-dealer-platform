<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\FinanceApplication;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FinanceRejected extends Notification implements ShouldQueue
{
    public function __construct(public FinanceApplication $application, public readonly string $reason = '')
    {
        $application->load('vehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Finance Application Update')
            ->greeting('Regarding your finance application')
            ->line("Your finance application for the {$this->application->vehicle->title} has been reviewed.")
            ->line("Application ID: {$this->application->id}")
            ->line('Unfortunately, we are unable to approve your application at this time.')
            ->when(! empty($this->reason), fn ($mail) => $mail->line("Reason: {$this->reason}"))
            ->line('If you have any questions or would like to discuss alternative options, please contact us.')
            ->action('View Application', route('customer.finance.show', $this->application->id));
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Finance Application Update',
            'message' => "Your finance application for {$this->application->vehicle->title} has been reviewed.",
            'application_id' => $this->application->id,
            'vehicle_id' => $this->application->vehicle_id,
            'status' => 'rejected',
            'reason' => $this->reason,
            'action_url' => route('customer.finance.show', $this->application->id),
        ];
    }
}
