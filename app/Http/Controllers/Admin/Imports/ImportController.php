<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Imports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Imports\StoreImportRequest;
use App\Http\Requests\Imports\UpdateImportRequest;
use App\Models\VehicleImport;
use App\Services\Imports\ImportService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportController extends Controller
{
    public function __construct(private readonly ImportService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', VehicleImport::class);

        return Inertia::render('Admin/Imports/Requests/Index', [
            'imports' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', VehicleImport::class);

        return Inertia::render('Admin/Imports/Requests/Create');
    }

    public function store(StoreImportRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.imports.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleImport $vehicleImport): Response
    {
        $this->authorize('view', $vehicleImport);

        return Inertia::render('Admin/Imports/Requests/Show', [
            'vehicleImport' => $vehicleImport,
        ]);
    }

    public function edit(VehicleImport $vehicleImport): Response
    {
        $this->authorize('update', $vehicleImport);

        return Inertia::render('Admin/Imports/Requests/Edit', [
            'vehicleImport' => $vehicleImport,
        ]);
    }

    public function update(UpdateImportRequest $request, VehicleImport $vehicleImport): RedirectResponse
    {
        $this->service->update($vehicleImport, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleImport $vehicleImport): RedirectResponse
    {
        $this->authorize('delete', $vehicleImport);
        $this->service->delete($vehicleImport);

        return redirect()->route('admin.imports.index')->with('success', 'Deleted successfully.');
    }
}
