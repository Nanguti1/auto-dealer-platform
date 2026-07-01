<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;

class PaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null;
    }

    public function update(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, Payment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
