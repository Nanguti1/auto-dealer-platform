<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecentlyViewController extends Controller
{
    public function index(): Response
    {
        $recentlyViewed = auth()->user()
            ? auth()->user()->recentlyViewedVehicles()->with('vehicle')->recent()->limit(12)->get()
            : [];

        $vehicles = $recentlyViewed->map(fn ($item) => [
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

        return Inertia::render('customer/recently-viewed', [
            'vehicles' => $vehicles,
        ]);
    }

    public function store(Request $request): void
    {
        $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
        ]);

        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        if (auth()->check()) {
            auth()->user()->recentlyViewedVehicles()->updateOrCreate(
                ['vehicle_id' => $vehicle->id],
                ['viewed_at' => now()]
            );
        }
    }

    public function destroy(): void
    {
        if (auth()->check()) {
            auth()->user()->recentlyViewedVehicles()->delete();
        }
    }
}
