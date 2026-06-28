<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\VehicleFeatures;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleFeatures\StoreVehicleFeatureRequest;
use App\Http\Requests\VehicleFeatures\UpdateVehicleFeatureRequest;
use App\Models\VehicleFeature;
use App\Services\VehicleFeatures\VehicleFeatureService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleFeatureController extends Controller
{
    public function __construct(private readonly VehicleFeatureService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', VehicleFeature::class);

        return Inertia::render('Admin/Inventory/Features/Index', [
            'vehicleFeatures' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', VehicleFeature::class);

        return Inertia::render('Admin/Inventory/Features/Create');
    }

    public function store(StoreVehicleFeatureRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.vehicle-features.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleFeature $vehicleFeature): Response
    {
        $this->authorize('view', $vehicleFeature);

        return Inertia::render('Admin/Inventory/Features/Show', [
            'vehicleFeature' => $vehicleFeature,
        ]);
    }

    public function edit(VehicleFeature $vehicleFeature): Response
    {
        $this->authorize('update', $vehicleFeature);

        return Inertia::render('Admin/Inventory/Features/Edit', [
            'vehicleFeature' => $vehicleFeature,
        ]);
    }

    public function update(UpdateVehicleFeatureRequest $request, VehicleFeature $vehicleFeature): RedirectResponse
    {
        $this->service->update($vehicleFeature, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleFeature $vehicleFeature): RedirectResponse
    {
        $this->authorize('delete', $vehicleFeature);
        $this->service->delete($vehicleFeature);

        return redirect()->route('admin.vehicle-features.index')->with('success', 'Deleted successfully.');
    }
}
