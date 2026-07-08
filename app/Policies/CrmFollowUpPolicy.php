<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
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
        return $user !== null && $model->isAccessibleThrough($user, 'lead');
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'lead') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'lead') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'lead') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, CrmFollowUp $model): bool
    {
        return $user !== null && $model->isAccessibleThrough($user, 'lead') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
