<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function view(User $user, User $model): bool
    {
        return $user !== null && (in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true) || $user->id === $model->id);
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value;
    }

    public function update(User $user, User $model): bool
    {
        return $user !== null && ($user->role?->name === RoleEnum::ADMIN->value || $user->id === $model->id);
    }

    public function delete(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value && $user->id !== $model->id;
    }

    public function restore(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value;
    }

    public function forceDelete(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === RoleEnum::ADMIN->value && $user->id !== $model->id;
    }
}
