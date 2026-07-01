<?php

declare(strict_types=1);

namespace App\Policies;

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
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, Refund $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'payment') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
