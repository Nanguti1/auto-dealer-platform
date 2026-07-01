<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\TradeInInspection;
use App\Models\User;

class TradeInInspectionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, TradeInInspection $model): bool
    {
        return $user !== null;
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, TradeInInspection $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, TradeInInspection $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, TradeInInspection $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, TradeInInspection $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
