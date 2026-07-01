<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\CrmFollowUp;
use App\Models\User;

class CrmFollowUpPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, CrmFollowUp $model): bool
    {
        return $user !== null;
    }

    public function create(User $user): bool
    {
        return $user !== null;
    }

    public function update(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }
}
