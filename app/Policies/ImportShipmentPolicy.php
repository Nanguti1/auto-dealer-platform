<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ImportShipment;
use App\Models\User;

class ImportShipmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, ImportShipment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, ImportShipment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, ImportShipment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, ImportShipment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, ImportShipment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
