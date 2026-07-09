<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Review;
use App\Models\User;

class ReviewPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle'));
    }

    public function create(User $user): bool
    {
        return $user !== null;
    }

    public function update(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function feature(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function publish(User $user, Review $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function approve(User $user, Review $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function reject(User $user, Review $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function assign(User $user, Review $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
