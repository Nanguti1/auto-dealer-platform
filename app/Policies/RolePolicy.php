<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Role;
use App\Models\User;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function view(User $user, Role $role): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function update(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function delete(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === 'admin' && $role->name !== 'admin';
    }

    public function restore(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function forceDelete(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === 'admin' && $role->name !== 'admin';
    }
}
