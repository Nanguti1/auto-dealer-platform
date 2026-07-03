<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(): Response
    {
        $reservations = auth()->user()
            ? auth()->user()->vehicleReservations()->with('vehicle')->recent()->get()
            : [];

        $items = $reservations->map(fn ($reservation) => [
            'id' => $reservation->id,
            'vehicle' => [
                'id' => $reservation->vehicle->id,
                'name' => $reservation->vehicle->name,
                'image' => $reservation->vehicle->featured_image_path,
                'price' => $reservation->vehicle->price,
            ],
            'depositAmount' => $reservation->deposit_amount,
            'status' => $reservation->status,
            'expiresAt' => $reservation->expires_at?->toDateString(),
        ]);

        return Inertia::render('customer/reservations', [
            'reservations' => $items,
        ]);
    }
}
