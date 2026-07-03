<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\AuditLog;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SettingObserver
{
    public function created(Setting $setting): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Setting::class,
                'auditable_id' => $setting->id,
                'event' => 'setting.created',
                'old_values' => null,
                'new_values' => [
                    'key' => $setting->key,
                    'value' => $this->isSensitive($setting->key) ? '[REDACTED]' : $setting->value,
                    'group' => $setting->group,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log setting creation: {$e->getMessage()}", [
                'exception' => $e,
                'setting_id' => $setting->id,
            ]);
        }
    }

    public function updated(Setting $setting): void
    {
        try {
            $changes = $setting->getDirty();
            unset($changes['updated_at']);

            if (empty($changes)) {
                return;
            }

            $oldValues = [];
            $newValues = [];

            foreach ($changes as $key => $newValue) {
                $oldValue = $setting->getOriginal($key);

                if ($this->isSensitive($key)) {
                    $oldValues[$key] = '[REDACTED]';
                    $newValues[$key] = '[REDACTED]';
                } else {
                    $oldValues[$key] = $oldValue;
                    $newValues[$key] = $newValue;
                }
            }

            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Setting::class,
                'auditable_id' => $setting->id,
                'event' => 'setting.updated',
                'old_values' => $oldValues,
                'new_values' => $newValues,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log setting update: {$e->getMessage()}", [
                'exception' => $e,
                'setting_id' => $setting->id,
            ]);
        }
    }

    public function deleted(Setting $setting): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Setting::class,
                'auditable_id' => $setting->id,
                'event' => 'setting.deleted',
                'old_values' => [
                    'key' => $setting->key,
                    'value' => $this->isSensitive($setting->key) ? '[REDACTED]' : $setting->value,
                    'group' => $setting->group,
                ],
                'new_values' => null,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log setting deletion: {$e->getMessage()}", [
                'exception' => $e,
                'setting_id' => $setting->id,
            ]);
        }
    }

    protected function isSensitive(string $key): bool
    {
        $sensitivePatterns = ['password', 'secret', 'key', 'token', 'api', 'credential'];
        foreach ($sensitivePatterns as $pattern) {
            if (str_contains(strtolower($key), $pattern)) {
                return true;
            }
        }

        return false;
    }
}
