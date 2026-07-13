<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;
use App\Models\VehicleImport;

class VehicleImportPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->branch_id !== null || in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true));
    }

    public function update(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function feature(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function publish(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function approve(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function reject(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function assign(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
