<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreInvoiceRequest;
use App\Http\Requests\Sales\UpdateInvoiceRequest;
use App\Models\Invoice;
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

        return Inertia::render('Admin/Sales/Invoices/Create');
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
            'invoice' => $invoice->load(['vehicle', 'payment', 'user', 'receipts', 'refunds']),
        ]);
    }

    public function edit(Invoice $invoice): Response
    {
        $this->authorize('update', $invoice);

        return Inertia::render('Admin/Sales/Invoices/Edit', [
            'invoice' => $invoice->load(['vehicle', 'payment', 'user']),
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
}
