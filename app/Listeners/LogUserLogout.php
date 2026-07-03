<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\AuditLog;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Log;

class LogUserLogout
{
    public function handle(Logout $event): void
    {
        try {
            AuditLog::create([
                'user_id' => $event->user->id,
                'auditable_type' => get_class($event->user),
                'auditable_id' => $event->user->id,
                'event' => Logout::class,
                'old_values' => null,
                'new_values' => [
                    'logout_method' => $event->guard,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            Log::info('User logout logged', [
                'user_id' => $event->user->id,
                'guard' => $event->guard,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log user logout: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $event->user->id,
            ]);
        }
    }
}
