<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\FinanceDocument;
use App\Models\User;

class FinanceDocumentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, FinanceDocument $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'financeApplication');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, FinanceDocument $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'financeApplication') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, FinanceDocument $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'financeApplication') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, FinanceDocument $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'financeApplication') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, FinanceDocument $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'financeApplication') && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
