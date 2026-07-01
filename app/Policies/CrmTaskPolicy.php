<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\CrmTask;
use App\Models\User;

class CrmTaskPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, CrmTask $model): bool
    {
        return $user !== null;
    }

    public function create(User $user): bool
    {
        return $user !== null;
    }

    public function update(User $user, CrmTask $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, CrmTask $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, CrmTask $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, CrmTask $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
