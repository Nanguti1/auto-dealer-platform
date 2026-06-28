<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Services\Reservations\ReservationService;

class CreateReservationAction
{
    public function __construct(private readonly ReservationService $service)
    {
    }

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
