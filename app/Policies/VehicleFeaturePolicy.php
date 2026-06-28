<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\VehicleFeature;
use App\Models\User;

class VehicleFeaturePolicy
{
    public function viewAny(User $user,): bool
    {
        return $user !== null;
    }

    public function view(User $user, VehicleFeature $model): bool
    {
        return $user !== null;
    }

    public function create(User $user,): bool
    {
        return $user !== null;
    }

    public function update(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, VehicleFeature $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

}
