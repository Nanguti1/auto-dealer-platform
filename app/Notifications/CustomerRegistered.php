<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Notifications\Messages\MailMessage;

class CustomerRegistered extends VerifyEmailBase
{
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Welcome to Our Dealership')
            ->greeting('Welcome!')
            ->line('Thank you for creating an account with our dealership.')
            ->line('Your account has been successfully created.')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $this->verificationUrl($notifiable))
            ->line('If you did not create an account, no further action is required.');
    }
}
