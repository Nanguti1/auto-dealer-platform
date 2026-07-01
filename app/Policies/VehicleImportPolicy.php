<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use App\Models\VehicleImport;

class VehicleImportPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, VehicleImport $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
