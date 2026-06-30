<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customers\StoreCustomerDocumentRequest;
use App\Models\Customer;
use App\Models\CustomerDocument;
use App\Services\Customers\CustomerDocumentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function __construct(private readonly CustomerDocumentService $service) {}

    public function index(Request $request, Customer $customer): Response
    {
        $this->authorize('viewAny', CustomerDocument::class);

        return Inertia::render('Admin/Customers/Documents/Index', [
            'customer' => $customer,
            'documents' => $customer->documents()->latest()->get(),
        ]);
    }

    public function create(Customer $customer): Response
    {
        $this->authorize('create', CustomerDocument::class);

        return Inertia::render('Admin/Customers/Documents/Create', [
            'customer' => $customer,
        ]);
    }

    public function store(StoreCustomerDocumentRequest $request, Customer $customer): RedirectResponse
    {
        $this->authorize('create', CustomerDocument::class);

        $document = new CustomerDocument(['customer_id' => $customer->id]);
        $this->service->upload($document, $request->file('file'), $request->validated()['type']);

        return redirect()->route('admin.customers.documents.index', $customer)->with('success', 'Document uploaded successfully.');
    }

    public function show(Customer $customer, $document): Response
    {
        $document = CustomerDocument::findOrFail($document);
        $this->authorize('view', $document);

        return Inertia::render('Admin/Customers/Documents/Show', [
            'customer' => $customer,
            'document' => $document,
        ]);
    }

    public function destroy(Customer $customer, $document): RedirectResponse
    {
        $document = CustomerDocument::findOrFail($document);
        $this->authorize('delete', $document);
        $this->service->delete($document);

        return redirect()->route('admin.customers.documents.index', $customer)->with('success', 'Document deleted successfully.');
    }
}
