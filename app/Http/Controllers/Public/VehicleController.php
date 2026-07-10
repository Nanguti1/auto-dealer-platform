<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BodyType;
use App\Models\FuelType;
use App\Models\Make;
use App\Models\Vehicle;
use App\Models\VehicleCondition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Vehicle::query()
            ->whereNull('sold_at')
            ->whereNotNull('listed_at');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('stock_number', 'like', "%{$search}%")
                    ->orWhere('vin', 'like', "%{$search}%")
                    ->orWhereHas('make', fn ($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('vehicleModel', fn ($q) => $q->where('name', 'like', "%{$search}%"));
            });
        }

        // Filter by make
        if ($request->filled('make')) {
            $query->whereHas('make', fn ($q) => $q->where('slug', $request->make));
        }

        // Filter by body type
        if ($request->filled('bodyType')) {
            $query->whereHas('bodyType', fn ($q) => $q->where('slug', $request->bodyType));
        }

        // Filter by fuel type
        if ($request->filled('fuelType')) {
            $query->whereHas('fuelType', fn ($q) => $q->where('slug', $request->fuelType));
        }

        // Filter by condition
        if ($request->filled('condition')) {
            $query->whereHas('vehicleCondition', fn ($q) => $q->where('slug', $request->condition));
        }

        // Price range
        if ($request->filled('minPrice')) {
            $query->where('sale_price', '>=', $request->minPrice);
        }

        if ($request->filled('maxPrice')) {
            $query->where('sale_price', '<=', $request->maxPrice);
        }

        // Mileage range
        if ($request->filled('maxMileage')) {
            $query->where('mileage', '<=', $request->maxMileage);
        }

        // Year range
        if ($request->filled('minYear')) {
            $query->where('year', '>=', $request->minYear);
        }

        if ($request->filled('maxYear')) {
            $query->where('year', '<=', $request->maxYear);
        }

        // Sorting
        $sort = $request->get('sort', 'newest');
        match ($sort) {
            'price_asc' => $query->orderBy('sale_price', 'asc'),
            'price_desc' => $query->orderBy('sale_price', 'desc'),
            'mileage_asc' => $query->orderBy('mileage', 'asc'),
            'year_desc' => $query->orderBy('year', 'desc'),
            default => $query->orderBy('listed_at', 'desc'),
        };

        // Pagination with eager loading to prevent N+1 queries
        $vehicles = $query->with([
            'make',
            'vehicleModel',
            'fuelType',
            'transmissionType',
            'bodyType',
            'galleries',
            'vehicleCondition',
            'color',
            'interiorColor',
        ])->paginate(15)->withQueryString();

        // Transform to match frontend expectations
        $transformedVehicles = collect($vehicles->items())->map(fn ($vehicle) => [
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
        ])->toArray();

        return Inertia::render('inventory/index', [
            'vehicles' => [
                'data' => $transformedVehicles,
                'links' => $vehicles->toArray()['links'],
                'current_page' => $vehicles->currentPage(),
                'last_page' => $vehicles->lastPage(),
                'total' => $vehicles->total(),
            ],
            'filters' => $request->only(['search', 'make', 'bodyType', 'fuelType', 'condition', 'minPrice', 'maxPrice', 'maxMileage', 'minYear', 'maxYear', 'sort']),
            'filterOptions' => $this->getFilterOptions(),
        ]);
    }

    public function show(string $slug): Response
    {
        $vehicle = Vehicle::with([
            'make',
            'vehicleModel',
            'trimLevel',
            'bodyType',
            'fuelType',
            'transmissionType',
            'driveType',
            'engineType',
            'color',
            'interiorColor',
            'vehicleCondition',
            'inventoryStatus',
            'galleries',
            'features',
            'specifications',
        ])
            ->where('slug', $slug)
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->firstOrFail();

        // Get related vehicles (same make, different vehicle)
        $related = Vehicle::with([
            'make',
            'vehicleModel',
            'bodyType',
            'fuelType',
            'transmissionType',
            'vehicleCondition',
            'color',
            'interiorColor',
            'galleries',
        ])
            ->where('make_id', $vehicle->make_id)
            ->where('id', '!=', $vehicle->id)
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->limit(3)
            ->get()
            ->map(fn ($v) => [
                'id' => $v->id,
                'slug' => $v->slug,
                'name' => $v->title,
                'brand' => $v->make->name ?? '',
                'model' => $v->vehicleModel->name ?? '',
                'year' => $v->year,
                'price' => (float) $v->sale_price,
                'mileage' => $v->mileage,
                'fuelType' => $v->fuelType->name ?? '',
                'transmission' => $v->transmissionType->name ?? '',
                'bodyType' => $v->bodyType->name ?? '',
                'image' => $v->galleries->first()?->path ?? '',
                'condition' => $v->vehicleCondition->slug ?? '',
                'featured' => $v->is_featured,
                'stockNumber' => $v->stock_number,
                'vin' => $v->vin,
                'msrp' => $v->msrp ? (float) $v->msrp : null,
                'color' => $v->color->name ?? '',
                'interiorColor' => $v->interiorColor->name ?? '',
            ])->toArray();

        $transformedVehicle = [
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
            'description' => $vehicle->description ?? '',
            'color' => $vehicle->color->name ?? '',
            'interiorColor' => $vehicle->interiorColor->name ?? '',
            'driveType' => $vehicle->driveType->name ?? '',
            'engineType' => $vehicle->engineType->name ?? '',
            'trim' => $vehicle->trimLevel->name ?? '',
            'listedAt' => $vehicle->listed_at?->toDateString(),
            'galleries' => $vehicle->galleries->map(fn ($gallery) => [
                'id' => $gallery->id,
                'path' => $gallery->path,
                'alt' => $gallery->alt ?? $vehicle->title,
                'isPrimary' => $gallery->is_primary ?? false,
            ])->toArray(),
            'features' => $vehicle->features->map(fn ($feature) => [
                'id' => $feature->id,
                'name' => $feature->name,
                'category' => $feature->category ?? 'General',
            ])->toArray(),
            'specifications' => $vehicle->specifications->groupBy('group')->map(fn ($specs, $group) => [
                'group' => $group,
                'items' => $specs->map(fn ($spec) => [
                    'name' => $spec->name,
                    'value' => $spec->value,
                    'unit' => $spec->unit ?? '',
                ])->toArray(),
            ])->values()->toArray(),
        ];

        return Inertia::render('inventory/show', [
            'vehicle' => $transformedVehicle,
            'related' => $related,
        ]);
    }

    protected function getFilterOptions(): array
    {
        return Cache::remember('vehicle.filter.options', now()->addHours(6), function () {
            return [
                'makes' => Make::whereHas('vehicles', fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at'))
                    ->withCount(['vehicles' => fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at')])
                    ->orderBy('name')
                    ->get()
                    ->map(fn ($make) => [
                        'value' => $make->slug,
                        'label' => $make->name,
                        'count' => $make->vehicles_count,
                    ])->toArray(),
                'bodyTypes' => BodyType::whereHas('vehicles', fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at'))
                    ->where('is_active', true)
                    ->withCount(['vehicles' => fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at')])
                    ->orderBy('name')
                    ->get()
                    ->map(fn ($bodyType) => [
                        'value' => $bodyType->slug,
                        'label' => $bodyType->name,
                        'count' => $bodyType->vehicles_count,
                    ])->toArray(),
                'fuelTypes' => FuelType::whereHas('vehicles', fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at'))
                    ->where('is_active', true)
                    ->withCount(['vehicles' => fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at')])
                    ->orderBy('name')
                    ->get()
                    ->map(fn ($fuelType) => [
                        'value' => $fuelType->slug,
                        'label' => $fuelType->name,
                        'count' => $fuelType->vehicles_count,
                    ])->toArray(),
                'conditions' => VehicleCondition::whereHas('vehicles', fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at'))
                    ->withCount(['vehicles' => fn ($q) => $q->whereNull('sold_at')->whereNotNull('listed_at')])
                    ->orderBy('name')
                    ->get()
                    ->map(fn ($condition) => [
                        'value' => $condition->slug,
                        'label' => $condition->name,
                        'count' => $condition->vehicles_count,
                    ])->toArray(),
            ];
        });
    }
}
