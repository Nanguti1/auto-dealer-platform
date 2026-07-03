<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserObserver
{
    public function created(User $user): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'event' => 'user.created',
                'old_values' => null,
                'new_values' => $this->filterSensitiveData($user->toArray()),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log user creation: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $user->id,
            ]);
        }
    }

    public function updated(User $user): void
    {
        try {
            $changes = $user->getDirty();

            // Only log if there are actual changes (excluding timestamps)
            unset($changes['updated_at']);

            if (empty($changes)) {
                return;
            }

            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'event' => 'user.updated',
                'old_values' => $this->filterSensitiveData($user->getOriginal()),
                'new_values' => $this->filterSensitiveData($changes),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log user update: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $user->id,
            ]);
        }
    }

    public function deleted(User $user): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => User::class,
                'auditable_id' => $user->id,
                'event' => 'user.deleted',
                'old_values' => $this->filterSensitiveData($user->toArray()),
                'new_values' => null,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log user deletion: {$e->getMessage()}", [
                'exception' => $e,
                'user_id' => $user->id,
            ]);
        }
    }

    protected function filterSensitiveData(array $attributes): array
    {
        $sensitiveKeys = ['password', 'token', 'secret', 'api_key', 'credit_card', 'remember_token'];
        foreach ($sensitiveKeys as $key) {
            unset($attributes[$key]);
        }

        return $attributes;
    }
}
