<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\VehicleGallery;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleGallery\StoreVehicleGalleryRequest;
use App\Http\Requests\VehicleGallery\UpdateVehicleGalleryRequest;
use App\Models\Vehicle;
use App\Models\VehicleGallery;
use App\Services\VehicleGallery\VehicleGalleryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleGalleryController extends Controller
{
    public function __construct(private readonly VehicleGalleryService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', VehicleGallery::class);

        return Inertia::render('Admin/Inventory/Gallery/Index', [
            'vehicleGalleries' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', VehicleGallery::class);

        $vehicles = Vehicle::with(['make', 'vehicleModel'])
            ->select('id', 'year', 'make_id', 'model_id')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($vehicle) {
                return [
                    'id' => $vehicle->id,
                    'label' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                ];
            });

        return Inertia::render('Admin/Inventory/Gallery/Create', [
            'vehicles' => $vehicles,
        ]);
    }

    public function store(StoreVehicleGalleryRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.vehicle-galleries.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleGallery $vehicleGallery): Response
    {
        $this->authorize('view', $vehicleGallery);

        return Inertia::render('Admin/Inventory/Gallery/Show', [
            'vehicleGallery' => $vehicleGallery,
        ]);
    }

    public function edit(VehicleGallery $vehicleGallery): Response
    {
        $this->authorize('update', $vehicleGallery);

        $vehicles = Vehicle::with(['make', 'vehicleModel'])
            ->select('id', 'year', 'make_id', 'model_id')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($vehicle) {
                return [
                    'id' => $vehicle->id,
                    'label' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                ];
            });

        return Inertia::render('Admin/Inventory/Gallery/Edit', [
            'vehicleGallery' => $vehicleGallery,
            'vehicles' => $vehicles,
        ]);
    }

    public function update(UpdateVehicleGalleryRequest $request, VehicleGallery $vehicleGallery): RedirectResponse
    {
        $this->service->update($vehicleGallery, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleGallery $vehicleGallery): RedirectResponse
    {
        $this->authorize('delete', $vehicleGallery);
        $this->service->delete($vehicleGallery);

        return redirect()->route('admin.vehicle-galleries.index')->with('success', 'Deleted successfully.');
    }
}
