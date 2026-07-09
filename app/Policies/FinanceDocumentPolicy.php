<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\FinanceDocument;
use App\Models\User;

class FinanceDocumentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, FinanceDocument $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'financeApplication'));
    }

    public function create(User $user): bool
    {
        return $user !== null && $user->branch_id !== null && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function update(User $user, FinanceDocument $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'financeApplication')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, FinanceDocument $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'financeApplication')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, FinanceDocument $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'financeApplication')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, FinanceDocument $model): bool
    {
        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'financeApplication')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
