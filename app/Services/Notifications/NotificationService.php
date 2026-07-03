<?php

declare(strict_types=1);

namespace App\Services\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Collection;

class NotificationService
{
    /**
     * @param  iterable<int, mixed>  $notifiables
     */
    public function notifyMany(iterable $notifiables, Notification $notification): void
    {
        collect($notifiables)->each(fn (mixed $notifiable): mixed => $notifiable->notify($notification));
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, mixed>
     */
    public function unreadFor(mixed $notifiable, array $filters = []): Collection
    {
        return $notifiable->unreadNotifications()->latest()->get();
    }
}
