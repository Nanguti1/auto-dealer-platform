<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\CustomerNote;
use App\Models\User;

class CustomerNotePolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, CustomerNote $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'customer.user');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, CustomerNote $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'customer.user') && (in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true) || $user->id === $model->user_id);
    }

    public function delete(User $user, CustomerNote $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'customer.user') && (in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true) || $user->id === $model->user_id);
    }

    public function restore(User $user, CustomerNote $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'customer.user') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, CustomerNote $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'customer.user') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
