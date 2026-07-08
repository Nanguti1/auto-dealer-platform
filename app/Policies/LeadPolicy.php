<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Lead;
use App\Models\User;

class LeadPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function feature(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function publish(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function approve(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function reject(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function assign(User $user, Lead $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
