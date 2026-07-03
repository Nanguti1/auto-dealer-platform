<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\AuditLog;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Log;

class LogPasswordReset
{
    public function handle(PasswordReset $event): void
    {
        try {
            AuditLog::create([
                'user_id' => $event->user->id,
                'auditable_type' => get_class($event->user),
                'auditable_id' => $event->user->id,
                'event' => PasswordReset::class,
                'old_values' => null,
                'new_values' => [
                    'password_reset' => true,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            Log::info('Password reset logged', [
                'user_id' => $event->user->id,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log password reset: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $event->user->id,
            ]);
        }
    }
}
