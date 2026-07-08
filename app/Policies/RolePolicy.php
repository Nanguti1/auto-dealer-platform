<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Role;
use App\Models\User;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function view(User $user, Role $role): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value;
    }

    public function update(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value;
    }

    public function delete(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value && $role->name !== RoleEnum::ADMIN->value;
    }

    public function restore(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value;
    }

    public function forceDelete(User $user, Role $role): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value && $role->name !== RoleEnum::ADMIN->value;
    }
}
