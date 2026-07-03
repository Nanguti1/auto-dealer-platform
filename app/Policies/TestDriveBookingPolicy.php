<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\TestDriveBooking;
use App\Models\User;

class TestDriveBookingPolicy
{
    public function view(User $user, TestDriveBooking $booking): bool
    {
        return $booking->user_id === $user->id;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, TestDriveBooking $booking): bool
    {
        return $booking->user_id === $user->id;
    }

    public function delete(User $user, TestDriveBooking $booking): bool
    {
        return $booking->user_id === $user->id;
    }
}
