<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Receipt;
use App\Models\User;

class ReceiptPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Receipt $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment');
    }

    public function create(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function update(User $user, Receipt $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, Receipt $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, Receipt $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, Receipt $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
