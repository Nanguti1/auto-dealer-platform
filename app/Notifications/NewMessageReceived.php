<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewMessageReceived extends Notification implements ShouldQueue
{
    public function __construct(public ContactMessage $message) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Contact Message Received')
            ->greeting('New inquiry from your website')
            ->line("You have received a new message from {$this->message->name}.")
            ->line("Email: {$this->message->email}")
            ->line("Phone: {$this->message->phone}")
            ->line("Subject: {$this->message->subject}")
            ->line("Message: {$this->message->message}")
            ->action('View Message', route('admin.messages.show', $this->message->id))
            ->line('Please respond to the inquiry as soon as possible.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'New Contact Message',
            'message' => "New message from {$this->message->name}",
            'message_id' => $this->message->id,
            'sender_name' => $this->message->name,
            'sender_email' => $this->message->email,
            'subject' => $this->message->subject,
            'action_url' => route('admin.messages.show', $this->message->id),
        ];
    }
}
