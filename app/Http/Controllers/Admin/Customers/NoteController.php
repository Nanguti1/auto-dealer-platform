<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customers\StoreCustomerNoteRequest;
use App\Http\Requests\Customers\UpdateCustomerNoteRequest;
use App\Models\Customer;
use App\Models\CustomerNote;
use App\Services\Customers\CustomerNoteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoteController extends Controller
{
    public function __construct(private readonly CustomerNoteService $service) {}

    public function index(Request $request, Customer $customer): Response
    {
        $this->authorize('viewAny', CustomerNote::class);

        return Inertia::render('Admin/Customers/Notes/Index', [
            'customer' => $customer,
            'notes' => $this->service->paginateForCustomer($customer->id, $request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(Customer $customer): Response
    {
        $this->authorize('create', CustomerNote::class);

        return Inertia::render('Admin/Customers/Notes/Create', [
            'customer' => $customer,
        ]);
    }

    public function store(StoreCustomerNoteRequest $request, Customer $customer): RedirectResponse
    {
        $this->authorize('create', CustomerNote::class);

        $this->service->create(array_merge($request->validated(), [
            'customer_id' => $customer->id,
            'user_id' => $request->user()->id,
        ]));

        return redirect()->route('admin.customers.notes.index', $customer)->with('success', 'Note created successfully.');
    }

    public function show(Customer $customer, $note): Response
    {
        $note = CustomerNote::findOrFail($note);
        $this->authorize('view', $note);

        return Inertia::render('Admin/Customers/Notes/Show', [
            'customer' => $customer,
            'note' => $note->load('user'),
        ]);
    }

    public function edit(Customer $customer, $note): Response
    {
        $note = CustomerNote::findOrFail($note);
        $this->authorize('update', $note);

        return Inertia::render('Admin/Customers/Notes/Edit', [
            'customer' => $customer,
            'note' => $note->load('user'),
        ]);
    }

    public function update(UpdateCustomerNoteRequest $request, Customer $customer, $note): RedirectResponse
    {
        $note = CustomerNote::findOrFail($note);
        $this->authorize('update', $note);
        $this->service->update($note, $request->validated());

        return back()->with('success', 'Note updated successfully.');
    }

    public function destroy(Customer $customer, $note): RedirectResponse
    {
        $note = CustomerNote::findOrFail($note);
        $this->authorize('delete', $note);
        $this->service->delete($note);

        return redirect()->route('admin.customers.notes.index', $customer)->with('success', 'Note deleted successfully.');
    }
}
