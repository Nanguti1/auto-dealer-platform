<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\StoreVehicleRequest;
use App\Http\Requests\Inventory\UpdateVehicleRequest;
use App\Models\BodyType;
use App\Models\Branch;
use App\Models\Color;
use App\Models\DriveType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\InteriorColor;
use App\Models\InventoryStatus;
use App\Models\Make;
use App\Models\Model;
use App\Models\TransmissionType;
use App\Models\TrimLevel;
use App\Models\Vehicle;
use App\Models\VehicleCategory;
use App\Models\VehicleCondition;
use App\Models\VehicleStatus;
use App\Services\Inventory\VehicleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(private readonly VehicleService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Vehicle::class);

        return Inertia::render('Admin/Inventory/Vehicles/Index', [
            'vehicles' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Vehicle::class);

        return Inertia::render('Admin/Inventory/Vehicles/Create', [
            'branches' => Branch::active()->get()->map(fn ($branch) => [
                'value' => $branch->id,
                'label' => $branch->name,
            ]),
            'makes' => Make::active()->get()->map(fn ($make) => [
                'value' => $make->id,
                'label' => $make->name,
            ]),
            'models' => Model::active()->get()->map(fn ($model) => [
                'value' => $model->id,
                'label' => $model->name,
                'make_id' => $model->make_id,
            ]),
            'vehicleCategories' => VehicleCategory::active()->get()->map(fn ($category) => [
                'value' => $category->id,
                'label' => $category->name,
            ]),
            'trimLevels' => TrimLevel::active()->get()->map(fn ($trim) => [
                'value' => $trim->id,
                'label' => $trim->name,
            ]),
            'bodyTypes' => BodyType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'fuelTypes' => FuelType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'transmissionTypes' => TransmissionType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'driveTypes' => DriveType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'engineTypes' => EngineType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'colors' => Color::active()->get()->map(fn ($color) => [
                'value' => $color->id,
                'label' => $color->name,
            ]),
            'interiorColors' => InteriorColor::active()->get()->map(fn ($color) => [
                'value' => $color->id,
                'label' => $color->name,
            ]),
            'vehicleConditions' => VehicleCondition::active()->get()->map(fn ($condition) => [
                'value' => $condition->id,
                'label' => $condition->name,
            ]),
            'vehicleStatuses' => VehicleStatus::active()->get()->map(fn ($status) => [
                'value' => $status->id,
                'label' => $status->name,
            ]),
            'inventoryStatuses' => InventoryStatus::active()->get()->map(fn ($status) => [
                'value' => $status->id,
                'label' => $status->name,
            ]),
        ]);
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        $vehicle = $this->service->create($request->validated());

        // Handle media uploads
        $mediaFiles = $request->getMediaFiles();
        \Log::info('Store vehicle - Media files: ', ['count' => count($mediaFiles), 'files' => array_map(fn ($f) => $f->getClientOriginalName(), $mediaFiles)]);

        if (! empty($mediaFiles)) {
            $this->service->handleMediaUploads($vehicle, $mediaFiles);
        }

        return redirect()->route('admin.vehicles.index')->with('success', 'Created successfully.');
    }

    public function show(Vehicle $vehicle): Response
    {
        $this->authorize('view', $vehicle);

        $vehicle->load('media');

        // Format media data for MediaUpload component
        $media = $vehicle->media->map(fn ($mediaItem) => [
            'id' => $mediaItem->id,
            'url' => $mediaItem->path,
            'alt' => $mediaItem->alt_text,
        ])->toArray();

        $vehicleArray = $vehicle->toArray();
        $vehicleArray['media'] = $media ?? [];

        return Inertia::render('Admin/Inventory/Vehicles/Show', [
            'vehicle' => $vehicleArray,
        ]);
    }

    public function edit(Vehicle $vehicle): Response
    {
        $this->authorize('update', $vehicle);

        $vehicle->load('media');

        // Format media data for MediaUpload component
        $media = $vehicle->media->map(fn ($mediaItem) => [
            'id' => $mediaItem->id,
            'url' => $mediaItem->path,
            'alt' => $mediaItem->alt_text,
        ])->toArray();

        $vehicleArray = $vehicle->toArray();
        $vehicleArray['media'] = $media ?? [];

        return Inertia::render('Admin/Inventory/Vehicles/Edit', [
            'vehicle' => $vehicleArray,
            'branches' => Branch::active()->get()->map(fn ($branch) => [
                'value' => $branch->id,
                'label' => $branch->name,
            ]),
            'makes' => Make::active()->get()->map(fn ($make) => [
                'value' => $make->id,
                'label' => $make->name,
            ]),
            'models' => Model::active()->get()->map(fn ($model) => [
                'value' => $model->id,
                'label' => $model->name,
                'make_id' => $model->make_id,
            ]),
            'vehicleCategories' => VehicleCategory::active()->get()->map(fn ($category) => [
                'value' => $category->id,
                'label' => $category->name,
            ]),
            'trimLevels' => TrimLevel::active()->get()->map(fn ($trim) => [
                'value' => $trim->id,
                'label' => $trim->name,
            ]),
            'bodyTypes' => BodyType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'fuelTypes' => FuelType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'transmissionTypes' => TransmissionType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'driveTypes' => DriveType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'engineTypes' => EngineType::active()->get()->map(fn ($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]),
            'colors' => Color::active()->get()->map(fn ($color) => [
                'value' => $color->id,
                'label' => $color->name,
            ]),
            'interiorColors' => InteriorColor::active()->get()->map(fn ($color) => [
                'value' => $color->id,
                'label' => $color->name,
            ]),
            'vehicleConditions' => VehicleCondition::active()->get()->map(fn ($condition) => [
                'value' => $condition->id,
                'label' => $condition->name,
            ]),
            'vehicleStatuses' => VehicleStatus::active()->get()->map(fn ($status) => [
                'value' => $status->id,
                'label' => $status->name,
            ]),
            'inventoryStatuses' => InventoryStatus::active()->get()->map(fn ($status) => [
                'value' => $status->id,
                'label' => $status->name,
            ]),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->service->update($vehicle, $request->validated());

        // Handle media uploads
        $mediaFiles = $request->getMediaFiles();
        \Log::info('Update vehicle - Media files: ', ['count' => count($mediaFiles), 'files' => array_map(fn ($f) => $f->getClientOriginalName(), $mediaFiles)]);

        if (! empty($mediaFiles)) {
            $this->service->handleMediaUploads($vehicle, $mediaFiles);
        }

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('delete', $vehicle);
        $this->service->delete($vehicle);

        return redirect()->route('admin.vehicles.index')->with('success', 'Deleted successfully.');
    }

    public function feature(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('feature', $vehicle);
        $this->service->feature($vehicle);

        return back()->with('success', 'Vehicle featured successfully.');
    }

    public function unfeature(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('feature', $vehicle);
        $this->service->unfeature($vehicle);

        return back()->with('success', 'Vehicle removed from featured inventory.');
    }

    public function markSold(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $this->service->markSold($vehicle, auth()->user());

        return back()->with('success', 'Vehicle marked as sold.');
    }

    public function markAvailable(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $vehicle->markAsAvailable();

        return back()->with('success', 'Vehicle marked as available.');
    }

    public function markReserved(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $vehicle->markAsReserved();

        return back()->with('success', 'Vehicle marked as reserved.');
    }

    public function markDelivered(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $vehicle->markAsDelivered();

        return back()->with('success', 'Vehicle marked as delivered.');
    }

    public function markCancelled(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $vehicle->markAsCancelled();

        return back()->with('success', 'Vehicle marked as cancelled.');
    }

    public function markReturned(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('update', $vehicle);
        $vehicle->markAsReturned();

        return back()->with('success', 'Vehicle marked as returned.');
    }

    public function duplicate(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('create', Vehicle::class);
        $copy = $this->service->duplicate($vehicle);

        return redirect()->route('admin.vehicles.edit', $copy)->with('success', 'Vehicle duplicated successfully.');
    }
}
