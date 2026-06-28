<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use App\Services\Reservations\ReservationService;

class CancelReservationAction
{
    public function __construct(private readonly ReservationService $service)
    {
    }

    public function __invoke(VehicleReservation $reservation): EloquentModel
    {
        return $this->service->update($reservation, ['status' => 'cancelled']);
    }
}
