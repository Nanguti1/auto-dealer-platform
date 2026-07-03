<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\AuditLog;
use App\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PermissionObserver
{
    public function created(Permission $permission): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Permission::class,
                'auditable_id' => $permission->id,
                'event' => 'permission.created',
                'old_values' => null,
                'new_values' => [
                    'name' => $permission->name,
                    'guard_name' => $permission->guard_name,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log permission creation: {$e->getMessage()}", [
                'exception' => $e,
                'permission_id' => $permission->id,
            ]);
        }
    }

    public function updated(Permission $permission): void
    {
        try {
            $changes = $permission->getDirty();
            unset($changes['updated_at']);

            if (empty($changes)) {
                return;
            }

            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Permission::class,
                'auditable_id' => $permission->id,
                'event' => 'permission.updated',
                'old_values' => $permission->getOriginal(),
                'new_values' => $changes,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log permission update: {$e->getMessage()}", [
                'exception' => $e,
                'permission_id' => $permission->id,
            ]);
        }
    }

    public function deleted(Permission $permission): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'auditable_type' => Permission::class,
                'auditable_id' => $permission->id,
                'event' => 'permission.deleted',
                'old_values' => [
                    'name' => $permission->name,
                    'guard_name' => $permission->guard_name,
                ],
                'new_values' => null,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to log permission deletion: {$e->getMessage()}", [
                'exception' => $e,
                'permission_id' => $permission->id,
            ]);
        }
    }
}
