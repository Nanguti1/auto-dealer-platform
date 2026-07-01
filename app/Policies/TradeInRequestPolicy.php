<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\TradeInRequest;
use App\Models\User;

class TradeInRequestPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null;
    }

    public function update(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, TradeInRequest $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
