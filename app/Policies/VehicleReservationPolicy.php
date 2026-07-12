<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;
use App\Models\VehicleReservation;

class VehicleReservationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user !== null;
    }

    public function view(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle'));
    }

    public function create(User $user): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $user->branch_id !== null;
    }

    public function update(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function delete(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function restore(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function forceDelete(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'vehicle')) && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function feature(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function publish(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function approve(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function reject(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }

    public function assign(User $user, VehicleReservation $model): bool
    {
        if ($user->role?->name === RoleEnum::ADMIN->value) {
            return true;
        }

        return $user !== null && $model->isAccessibleThrough($user, 'vehicle') && in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true);
    }
}
