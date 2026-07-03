<?php

declare(strict_types=1);

namespace App\Services\Reservations;

use App\Models\VehicleReservation;
use App\Services\Concerns\ManagesEloquentModels;

class ReservationService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleReservation::class;
    }
}
