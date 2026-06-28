<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\AnalyticsData;
use App\Models\User;

class AnalyticsDataPolicy
{
    public function viewAny(User $user,): bool
    {
        return $user !== null;
    }

    public function view(User $user, AnalyticsData $model): bool
    {
        return $user !== null;
    }

    public function create(User $user,): bool
    {
        return $user !== null;
    }

    public function update(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, AnalyticsData $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

}
