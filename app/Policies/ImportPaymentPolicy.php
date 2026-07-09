<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\ImportPayment;
use App\Models\User;

class ImportPaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, ImportPayment $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicleImport'));
    }

    public function create(User $user): bool
    {
        return $user !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function update(User $user, ImportPayment $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicleImport')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, ImportPayment $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicleImport')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, ImportPayment $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicleImport')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, ImportPayment $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicleImport')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
