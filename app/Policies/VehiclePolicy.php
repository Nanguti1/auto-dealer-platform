<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;
use App\Models\Vehicle;

class VehiclePolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user);
    }

    public function create(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value, RoleEnum::SALES_STAFF->value, RoleEnum::STAFF->value], true);
    }

    public function update(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function delete(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function restore(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function forceDelete(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value], true);
    }

    public function feature(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function publish(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function approve(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function reject(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::INVENTORY_MANAGER->value], true);
    }

    public function assign(User $user, Vehicle $model): bool
    {
        return $user !== null && $model->isAccessibleBy($user) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value, RoleEnum::SALES_MANAGER->value], true);
    }
}
