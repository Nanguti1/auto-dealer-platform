<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Imports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Imports\StoreShipmentRequest;
use App\Http\Requests\Imports\UpdateShipmentRequest;
use App\Models\ImportShipment;
use App\Models\VehicleImport;
use App\Services\Imports\ShipmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShipmentController extends Controller
{
    public function __construct(private readonly ShipmentService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', ImportShipment::class);

        return Inertia::render('Admin/Imports/Shipments/Index', [
            'shipments' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ImportShipment::class);

        return Inertia::render('Admin/Imports/Shipments/Create', [
            'vehicleImports' => VehicleImport::select('id', 'reference_number')->get(),
        ]);
    }

    public function store(StoreShipmentRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.shipments.index')->with('success', 'Shipment created successfully.');
    }

    public function show(ImportShipment $shipment): Response
    {
        $this->authorize('view', $shipment);

        return Inertia::render('Admin/Imports/Shipments/Show', [
            'shipment' => $shipment->load(['vehicleImport.customer', 'vehicleImport.vehicle']),
        ]);
    }

    public function edit(ImportShipment $shipment): Response
    {
        $this->authorize('update', $shipment);

        return Inertia::render('Admin/Imports/Shipments/Edit', [
            'shipment' => $shipment->load(['vehicleImport']),
            'vehicleImports' => VehicleImport::select('id', 'reference_number')->get(),
        ]);
    }

    public function update(UpdateShipmentRequest $request, ImportShipment $shipment): RedirectResponse
    {
        $this->service->update($shipment, $request->validated());

        return back()->with('success', 'Shipment updated successfully.');
    }

    public function updateTracking(Request $request, ImportShipment $shipment): RedirectResponse
    {
        $this->authorize('update', $shipment);

        $validated = $request->validate([
            'tracking_number' => ['nullable', 'string', 'max:255'],
            'carrier' => ['nullable', 'string', 'max:255'],
            'estimated_arrival' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'in:pending,in_transit,delivered,cancelled'],
        ]);

        $this->service->updateTracking($shipment, $validated);

        return back()->with('success', 'Shipment tracking updated successfully.');
    }

    public function markAsDelivered(ImportShipment $shipment): RedirectResponse
    {
        $this->authorize('update', $shipment);
        $this->service->markAsDelivered($shipment);

        return back()->with('success', 'Shipment marked as delivered successfully.');
    }

    public function destroy(ImportShipment $shipment): RedirectResponse
    {
        $this->authorize('delete', $shipment);
        $this->service->delete($shipment);

        return redirect()->route('admin.shipments.index')->with('success', 'Shipment deleted successfully.');
    }
}
