<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Permission;
use App\Models\User;

class PermissionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function view(User $user, Permission $permission): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function update(User $user, Permission $permission): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function delete(User $user, Permission $permission): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function restore(User $user, Permission $permission): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function forceDelete(User $user, Permission $permission): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }
}
