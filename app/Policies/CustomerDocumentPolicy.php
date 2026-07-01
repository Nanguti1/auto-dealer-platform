<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\CustomerDocument;
use App\Models\User;

class CustomerDocumentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function view(User $user, CustomerDocument $customerDocument): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function create(User $user): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function update(User $user, CustomerDocument $customerDocument): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function delete(User $user, CustomerDocument $customerDocument): bool
    {
        return $user !== null && ($user->role?->name === 'admin' || $user->role?->name === 'manager');
    }

    public function restore(User $user, CustomerDocument $customerDocument): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }

    public function forceDelete(User $user, CustomerDocument $customerDocument): bool
    {
        return $user !== null && $user->role?->name === 'admin';
    }
}
