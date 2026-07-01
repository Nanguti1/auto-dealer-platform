<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ImportPayment;
use App\Models\User;

class ImportPaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, ImportPayment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport');
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, ImportPayment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, ImportPayment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, ImportPayment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, ImportPayment $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicleImport') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
