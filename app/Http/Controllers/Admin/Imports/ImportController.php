<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Imports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Imports\StoreImportRequest;
use App\Http\Requests\Imports\UpdateImportRequest;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\Vehicle;
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

        return Inertia::render('Admin/Imports/Requests/Create', [
            'vehicles' => Vehicle::select('id', 'title', 'stock_number')->get(),
            'customers' => Customer::select('id', 'first_name', 'last_name', 'email', 'user_id')->get(),
            'suppliers' => Supplier::select('id', 'company_name')->get(),
        ]);
    }

    public function store(StoreImportRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.imports.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleImport $import): Response
    {
        $this->authorize('view', $import);

        return Inertia::render('Admin/Imports/Requests/Show', [
            'vehicleImport' => $import->load(['user', 'customer', 'supplier', 'vehicle', 'documents', 'shipments', 'payments']),
        ]);
    }

    public function edit(VehicleImport $import): Response
    {
        $this->authorize('update', $import);

        return Inertia::render('Admin/Imports/Requests/Edit', [
            'vehicleImport' => $import->load(['user', 'customer', 'supplier', 'vehicle']),
            'vehicles' => Vehicle::select('id', 'title', 'stock_number')->get(),
            'customers' => Customer::select('id', 'first_name', 'last_name', 'email', 'user_id')->get(),
            'suppliers' => Supplier::select('id', 'company_name')->get(),
        ]);
    }

    public function update(UpdateImportRequest $request, VehicleImport $import): RedirectResponse
    {
        $this->service->update($import, $request->validated());

        return redirect()->route('admin.imports.show', $import)->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleImport $import): RedirectResponse
    {
        $this->authorize('delete', $import);
        $this->service->delete($import);

        return redirect()->route('admin.imports.index')->with('success', 'Deleted successfully.');
    }
}
