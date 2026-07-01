<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function view(User $user, User $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager' || $user->id === $model->id);
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function update(User $user, User $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->id === $model->id);
    }

    public function delete(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === 'admin' && $user->id !== $model->id;
    }

    public function restore(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function forceDelete(User $user, User $model): bool
    {
        return $user !== null && $user->role?->name === 'admin' && $user->id !== $model->id;
    }
}
