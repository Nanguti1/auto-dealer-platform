<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;

class InvoicePolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Invoice $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, Invoice $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, Invoice $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, Invoice $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, Invoice $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
