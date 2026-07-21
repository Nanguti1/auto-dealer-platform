<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Imports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Imports\StoreImportPaymentRequest;
use App\Http\Requests\Imports\UpdateImportPaymentRequest;
use App\Models\ImportPayment;
use App\Models\VehicleImport;
use App\Services\Imports\ImportPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportPaymentController extends Controller
{
    public function __construct(private readonly ImportPaymentService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', ImportPayment::class);

        return Inertia::render('Admin/Imports/Payments/Index', [
            'importPayments' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ImportPayment::class);

        return Inertia::render('Admin/Imports/Payments/Create', [
            'importRequests' => VehicleImport::latest()->get(['id', 'reference_number', 'origin_country']),
        ]);
    }

    public function store(StoreImportPaymentRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.import-payments.index')->with('success', 'Import payment created successfully.');
    }

    public function show(ImportPayment $importPayment): Response
    {
        $this->authorize('view', $importPayment);

        return Inertia::render('Admin/Imports/Payments/Show', [
            'importPayment' => $importPayment->load(['vehicleImport.customer', 'vehicleImport.vehicle', 'vehicleImport.supplier', 'vehicleImport.payments']),
        ]);
    }

    public function edit(ImportPayment $importPayment): Response
    {
        $this->authorize('update', $importPayment);

        return Inertia::render('Admin/Imports/Payments/Edit', [
            'importPayment' => $importPayment->load(['vehicleImport']),
            'importRequests' => VehicleImport::latest()->get(['id', 'reference_number', 'origin_country']),
        ]);
    }

    public function update(UpdateImportPaymentRequest $request, ImportPayment $importPayment): RedirectResponse
    {
        $this->service->update($importPayment, $request->validated());

        return redirect()->route('admin.import-payments.show', $importPayment)->with('success', 'Import payment updated successfully.');
    }

    public function markAsPaid(ImportPayment $importPayment): RedirectResponse
    {
        $this->authorize('update', $importPayment);
        $this->service->markAsPaid($importPayment);

        return back()->with('success', 'Import payment marked as paid successfully.');
    }

    public function destroy(ImportPayment $importPayment): RedirectResponse
    {
        $this->authorize('delete', $importPayment);
        $this->service->delete($importPayment);

        return redirect()->route('admin.import-payments.index')->with('success', 'Import payment deleted successfully.');
    }
}
