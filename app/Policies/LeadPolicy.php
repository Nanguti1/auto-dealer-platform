<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Lead;
use App\Models\User;

class LeadPolicy
{
    public function viewAny(User $user,): bool
    {
        return $user !== null;
    }

    public function view(User $user, Lead $model): bool
    {
        return $user !== null;
    }

    public function create(User $user,): bool
    {
        return $user !== null;
    }

    public function update(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, Lead $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

}
