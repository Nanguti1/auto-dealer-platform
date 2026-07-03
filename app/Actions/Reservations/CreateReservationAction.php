<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use App\Events\ReservationCreated;
use App\Services\Reservations\ReservationService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateReservationAction
{
    public function __construct(private readonly ReservationService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        $reservation = $this->service->create($data);

        event(new ReservationCreated($reservation));

        return $reservation;
    }
}
