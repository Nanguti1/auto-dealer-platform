<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Refund;
use App\Models\User;

class RefundPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment');
    }

    public function create(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function update(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
