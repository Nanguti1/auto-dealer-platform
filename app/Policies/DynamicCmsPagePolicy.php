<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\DynamicCmsPage;
use App\Models\User;

class DynamicCmsPagePolicy
{
    public function viewAny(User $user,): bool
    {
        return $user !== null;
    }

    public function view(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null;
    }

    public function create(User $user,): bool
    {
        return $user !== null;
    }

    public function update(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function forceDelete(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function feature(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function publish(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function approve(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function reject(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function assign(User $user, DynamicCmsPage $model): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

}
