<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index(): Response
    {
        $wishlists = auth()->user()
            ->wishlists()
            ->with('vehicle')
            ->recent()
            ->get()
            ->map(fn ($wishlist) => [
                'id' => $wishlist->vehicle->id,
                'name' => $wishlist->vehicle->name,
                'price' => $wishlist->vehicle->price,
                'image' => $wishlist->vehicle->featured_image_path,
                'year' => $wishlist->vehicle->year,
                'mileage' => $wishlist->vehicle->mileage,
                'fuel_type' => $wishlist->vehicle->fuel_type,
                'transmission' => $wishlist->vehicle->transmission,
                'location' => $wishlist->vehicle->branch?->city,
            ]);

        return Inertia::render('customer/wishlist', [
            'vehicles' => $wishlists,
        ]);
    }

    public function store(Request $request): void
    {
        $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
        ]);

        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        auth()->user()->wishlists()->firstOrCreate([
            'vehicle_id' => $vehicle->id,
        ]);
    }

    public function destroy(Request $request): void
    {
        $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
        ]);

        auth()->user()->wishlists()->where('vehicle_id', $request->vehicle_id)->delete();
    }
}
