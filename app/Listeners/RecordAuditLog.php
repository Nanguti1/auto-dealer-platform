<?php

declare(strict_types=1);

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RecordAuditLog implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $user = Auth::user();
            $eventClass = get_class($event);

            $auditData = [
                'event' => $eventClass,
                'user_id' => $user?->id,
                'user_email' => $user?->email,
                'timestamp' => now()->toIso8601String(),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ];

            // Add event-specific data
            if (method_exists($event, '__toString')) {
                $auditData['event_data'] = (string) $event;
            } elseif (method_exists($event, 'toArray')) {
                $auditData['event_data'] = $event->toArray();
            }

            // Log to audit log (could be stored in database if audit_logs table exists)
            Log::info('Audit Log', $auditData);

            // If audit_logs table exists, store there
            // if (Schema::hasTable('audit_logs')) {
            //     DB::table('audit_logs')->insert([
            //         'user_id' => $user?->id,
            //         'event_type' => $eventClass,
            //         'event_data' => json_encode($auditData),
            //         'ip_address' => request()->ip(),
            //         'created_at' => now(),
            //     ]);
            // }
        } catch (\Exception $e) {
            Log::error("Failed to record audit log: {$e->getMessage()}");
            $this->release(30);
        }
    }
}
