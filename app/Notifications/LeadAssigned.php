<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Lead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LeadAssigned extends Notification implements ShouldQueue
{
    public function __construct(public Lead $lead)
    {
        $this->lead->load('vehicle');
    }

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $customerName = trim("{$this->lead->first_name} {$this->lead->last_name}");

        return (new MailMessage)
            ->subject('New Lead Assigned')
            ->greeting('You have been assigned a new lead')
            ->line("A new lead from {$customerName} has been assigned to you.")
            ->line("Lead ID: {$this->lead->id}")
            ->line("Email: {$this->lead->email}")
            ->line("Phone: {$this->lead->phone}")
            ->when($this->lead->vehicle, fn ($mail) => $mail->line("Vehicle: {$this->lead->vehicle->title}"))
            ->line("Source: {$this->lead->source}")
            ->line("Status: {$this->lead->status}")
            ->action('View Lead', route('admin.leads.show', $this->lead->id))
            ->line('Please follow up with the customer as soon as possible.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        $customerName = trim("{$this->lead->first_name} {$this->lead->last_name}");

        return [
            'title' => 'New Lead Assigned',
            'message' => "A new lead from {$customerName} has been assigned to you.",
            'lead_id' => $this->lead->id,
            'customer_name' => $customerName,
            'customer_email' => $this->lead->email,
            'vehicle_id' => $this->lead->vehicle_id,
            'source' => $this->lead->source,
            'status' => $this->lead->status,
            'action_url' => route('admin.leads.show', $this->lead->id),
        ];
    }
}
