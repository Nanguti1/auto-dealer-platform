<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\RecentlyViewedVehicle;
use App\Models\User;

class RecentlyViewedVehiclePolicy
{
    public function view(User $user, RecentlyViewedVehicle $recentlyViewed): bool
    {
        return $recentlyViewed->user_id === $user->id;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function delete(User $user, RecentlyViewedVehicle $recentlyViewed): bool
    {
        return $recentlyViewed->user_id === $user->id;
    }
}
