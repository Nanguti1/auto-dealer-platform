<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\FinanceApplication;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FinanceApproved extends Notification implements ShouldQueue
{
    public function __construct(public FinanceApplication $application)
    {
        $this->application->load('vehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Finance Application Approved')
            ->greeting('Congratulations!')
            ->line("Your finance application for the {$this->application->vehicle->title} has been approved.")
            ->line("Application ID: {$this->application->id}")
            ->line("Requested Amount: {$this->formatCurrency($this->application->requested_amount)}")
            ->line("Estimated Monthly Payment: {$this->formatCurrency($this->application->estimated_monthly_payment)}")
            ->line("Term: {$this->application->term_months} months")
            ->action('View Application', route('admin.finance-applications.show', $this->application->id))
            ->line('Please contact us to proceed with the next steps.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Finance Application Approved',
            'message' => "Your finance application for {$this->application->vehicle->title} has been approved.",
            'application_id' => $this->application->id,
            'vehicle_id' => $this->application->vehicle_id,
            'requested_amount' => $this->application->requested_amount,
            'estimated_monthly_payment' => $this->application->estimated_monthly_payment,
            'action_url' => route('admin.finance-applications.show', $this->application->id),
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
