<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\CrmTask;
use App\Models\User;

class CrmTaskPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, CrmTask $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'lead'));
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, CrmTask $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'lead')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, CrmTask $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'lead')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, CrmTask $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'lead')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, CrmTask $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'lead')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
