<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\AuditLog;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class LogUserLogin
{
    public function handle(Login $event): void
    {
        try {
            AuditLog::create([
                'user_id' => $event->user->id,
                'auditable_type' => get_class($event->user),
                'auditable_id' => $event->user->id,
                'event' => Login::class,
                'old_values' => null,
                'new_values' => [
                    'login_method' => $event->guard,
                    'remember' => $event->remember,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            Log::info('User login logged', [
                'user_id' => $event->user->id,
                'guard' => $event->guard,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log user login: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $event->user->id,
            ]);
        }
    }
}
