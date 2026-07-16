<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Supplier;
use App\Models\User;

class SupplierPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Supplier $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user);
    }

    public function create(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function update(User $user, Supplier $model): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function delete(User $user, Supplier $model): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, Supplier $model): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, Supplier $model): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
