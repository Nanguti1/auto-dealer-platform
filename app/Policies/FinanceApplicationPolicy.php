<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\FinanceApplication;
use App\Models\User;

class FinanceApplicationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function feature(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function publish(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function approve(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function reject(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function assign(User $user, FinanceApplication $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
