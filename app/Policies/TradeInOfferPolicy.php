<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\TradeInOffer;
use App\Models\User;

class TradeInOfferPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, TradeInOffer $model): bool
    {
        return $user !== null;
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, TradeInOffer $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, TradeInOffer $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, TradeInOffer $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, TradeInOffer $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
