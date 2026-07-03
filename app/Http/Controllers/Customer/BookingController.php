<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(): Response
    {
        $bookings = auth()->user()
            ? auth()->user()->testDriveBookings()->with('vehicle')->recent()->get()
            : [];

        $items = $bookings->map(fn ($booking) => [
            'id' => $booking->id,
            'vehicle' => [
                'id' => $booking->vehicle->id,
                'name' => $booking->vehicle->name,
                'image' => $booking->vehicle->featured_image_path,
                'price' => $booking->vehicle->price,
            ],
            'scheduledAt' => $booking->scheduled_at->toIso8601String(),
            'status' => $booking->status,
            'notes' => $booking->notes,
        ]);

        return Inertia::render('customer/bookings', [
            'bookings' => $items,
        ]);
    }
}
