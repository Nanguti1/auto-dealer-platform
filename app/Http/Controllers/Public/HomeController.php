<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Get featured vehicles
        $featuredVehicles = Vehicle::with(['make', 'vehicleModel', 'bodyType', 'galleries'])
            ->where('is_featured', true)
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->limit(3)
            ->get()
            ->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'name' => $vehicle->title,
                'brand' => $vehicle->make->name ?? '',
                'model' => $vehicle->vehicleModel->name ?? '',
                'year' => $vehicle->year,
                'price' => (float) $vehicle->sale_price,
                'mileage' => $vehicle->mileage,
                'fuelType' => $vehicle->fuelType->name ?? '',
                'transmission' => $vehicle->transmissionType->name ?? '',
                'bodyType' => $vehicle->bodyType->name ?? '',
                'image' => $vehicle->galleries->first()?->path ?? '',
                'condition' => $vehicle->vehicleCondition->slug ?? '',
                'featured' => $vehicle->is_featured,
                'stockNumber' => $vehicle->stock_number,
                'vin' => $vehicle->vin,
                'msrp' => $vehicle->msrp ? (float) $vehicle->msrp : null,
                'color' => $vehicle->color->name ?? '',
                'interiorColor' => $vehicle->interiorColor->name ?? '',
            ]);

        // Get latest arrivals
        $latestArrivals = Vehicle::with(['make', 'vehicleModel', 'bodyType', 'galleries'])
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->orderBy('listed_at', 'desc')
            ->limit(3)
            ->get()
            ->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'name' => $vehicle->title,
                'brand' => $vehicle->make->name ?? '',
                'model' => $vehicle->vehicleModel->name ?? '',
                'year' => $vehicle->year,
                'price' => (float) $vehicle->sale_price,
                'mileage' => $vehicle->mileage,
                'fuelType' => $vehicle->fuelType->name ?? '',
                'transmission' => $vehicle->transmissionType->name ?? '',
                'bodyType' => $vehicle->bodyType->name ?? '',
                'image' => $vehicle->galleries->first()?->path ?? '',
                'condition' => $vehicle->vehicleCondition->slug ?? '',
                'featured' => $vehicle->is_featured,
                'stockNumber' => $vehicle->stock_number,
                'vin' => $vehicle->vin,
                'msrp' => $vehicle->msrp ? (float) $vehicle->msrp : null,
                'color' => $vehicle->color->name ?? '',
                'interiorColor' => $vehicle->interiorColor->name ?? '',
            ]);

        return Inertia::render('welcome', [
            'featuredVehicles' => $featuredVehicles,
            'latestArrivals' => $latestArrivals,
        ]);
    }
}
