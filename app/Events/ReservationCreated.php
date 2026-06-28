<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\VehicleReservation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReservationCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public readonly VehicleReservation $reservation)
    {
    }
}
