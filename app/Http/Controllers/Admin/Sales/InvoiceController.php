<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreInvoiceRequest;
use App\Http\Requests\Sales\UpdateInvoiceRequest;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use App\Services\Sales\InvoiceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function __construct(private readonly InvoiceService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Invoice::class);

        return Inertia::render('Admin/Sales/Invoices/Index', [
            'invoices' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Invoice::class);

        return Inertia::render('Admin/Sales/Invoices/Create', [
            'customers' => Customer::select(['id', 'first_name', 'last_name', 'email', 'customer_number'])->get(),
            'vehicles' => Vehicle::select(['id', 'stock_number', 'make_id', 'model_id'])->with(['make', 'vehicleModel'])->get(),
            'reservations' => VehicleReservation::select(['id', 'reservation_number', 'customer_id'])->with('customer')->get(),
        ]);
    }

    public function store(StoreInvoiceRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function show(Invoice $invoice): Response
    {
        $this->authorize('view', $invoice);

        return Inertia::render('Admin/Sales/Invoices/Show', [
            'invoice' => $invoice->load(['vehicle', 'payments', 'user', 'receipts', 'refunds']),
        ]);
    }

    public function edit(Invoice $invoice): Response
    {
        $this->authorize('update', $invoice);

        return Inertia::render('Admin/Sales/Invoices/Edit', [
            'invoice' => $invoice->load(['vehicle', 'payments', 'user']),
            'customers' => Customer::select(['id', 'first_name', 'last_name', 'email', 'customer_number'])->get(),
            'vehicles' => Vehicle::select(['id', 'stock_number', 'make_id', 'model_id'])->with(['make', 'vehicleModel'])->get(),
            'reservations' => VehicleReservation::select(['id', 'reservation_number', 'customer_id'])->with('customer')->get(),
        ]);
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice): RedirectResponse
    {
        $this->service->update($invoice, $request->validated());

        return back()->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice): RedirectResponse
    {
        $this->authorize('delete', $invoice);
        $this->service->delete($invoice);

        return redirect()->route('admin.invoices.index')->with('success', 'Invoice deleted successfully.');
    }

    public function finalize(Invoice $invoice): RedirectResponse
    {
        $this->authorize('update', $invoice);
        $this->service->finalize($invoice);

        return back()->with('success', 'Invoice finalized successfully.');
    }

    public function cancel(Invoice $invoice): RedirectResponse
    {
        $this->authorize('update', $invoice);
        $this->service->cancel($invoice);

        return back()->with('success', 'Invoice cancelled successfully.');
    }

    public function restore(Invoice $invoice): RedirectResponse
    {
        $this->authorize('restore', $invoice);
        $invoice->restore();

        return redirect()->route('admin.invoices.index')->with('success', 'Restored successfully.');
    }

    public function forceDelete(Invoice $invoice): RedirectResponse
    {
        $this->authorize('forceDelete', $invoice);
        $invoice->forceDelete();

        return redirect()->route('admin.invoices.index')->with('success', 'Permanently deleted.');
    }
}
