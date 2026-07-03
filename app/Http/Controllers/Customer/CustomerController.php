<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function dashboard(): Response
    {
        $user = auth()->user();

        $wishlistCount = $user->wishlists()->count();

        $recentlyViewed = $user->recentlyViewedVehicles()
            ->with('vehicle')
            ->recent()
            ->limit(3)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->vehicle->id,
                'name' => $item->vehicle->name,
                'price' => $item->vehicle->price,
                'image' => $item->vehicle->featured_image_path,
                'year' => $item->vehicle->year,
                'mileage' => $item->vehicle->mileage,
                'fuel_type' => $item->vehicle->fuel_type,
                'transmission' => $item->vehicle->transmission,
                'location' => $item->vehicle->branch?->city,
            ]);

        $reservations = $user->vehicleReservations()
            ->with('vehicle')
            ->recent()
            ->limit(5)
            ->get()
            ->map(fn ($reservation) => [
                'id' => $reservation->id,
                'vehicle' => [
                    'id' => $reservation->vehicle->id,
                    'name' => $reservation->vehicle->name,
                ],
                'status' => $reservation->status,
            ]);

        $bookings = $user->testDriveBookings()
            ->with('vehicle')
            ->recent()
            ->limit(5)
            ->get()
            ->map(fn ($booking) => [
                'id' => $booking->id,
                'vehicle' => [
                    'id' => $booking->vehicle->id,
                    'name' => $booking->vehicle->name,
                ],
                'scheduledAt' => $booking->scheduled_at->toIso8601String(),
            ]);

        return Inertia::render('customer/dashboard', [
            'wishlistCount' => $wishlistCount,
            'recentlyViewed' => $recentlyViewed,
            'reservations' => $reservations,
            'bookings' => $bookings,
        ]);
    }
}
