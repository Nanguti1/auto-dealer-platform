<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreReceiptRequest;
use App\Http\Requests\Sales\UpdateReceiptRequest;
use App\Models\Customer;
use App\Models\Payment;
use App\Models\Receipt;
use App\Services\Sales\ReceiptService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReceiptController extends Controller
{
    public function __construct(private readonly ReceiptService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Receipt::class);

        return Inertia::render('Admin/Sales/Receipts/Index', [
            'receipts' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Receipt::class);

        return Inertia::render('Admin/Sales/Receipts/Create', [
            'payments' => Payment::select(['id', 'amount', 'currency', 'method', 'status'])->with('user')->get(),
            'customers' => Customer::select(['id', 'first_name', 'last_name', 'email', 'customer_number'])->get(),
        ]);
    }

    public function store(StoreReceiptRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Automatically set user_id to the currently authenticated user if not provided
        if (! isset($data['user_id'])) {
            $data['user_id'] = $request->user()->id;
        }

        $this->service->create($data);

        return redirect()->route('admin.receipts.index')->with('success', 'Receipt created successfully.');
    }

    public function show(Receipt $receipt): Response
    {
        $this->authorize('view', $receipt);

        return Inertia::render('Admin/Sales/Receipts/Show', [
            'receipt' => $receipt->load(['payment', 'invoice', 'user', 'customer']),
        ]);
    }

    public function edit(Receipt $receipt): Response
    {
        $this->authorize('update', $receipt);

        return Inertia::render('Admin/Sales/Receipts/Edit', [
            'receipt' => $receipt->load(['payment', 'invoice', 'user', 'customer']),
            'payments' => Payment::select(['id', 'amount', 'currency', 'method', 'status'])->with('user')->get(),
            'customers' => Customer::select(['id', 'first_name', 'last_name', 'email', 'customer_number'])->get(),
        ]);
    }

    public function update(UpdateReceiptRequest $request, Receipt $receipt): RedirectResponse
    {
        $this->service->update($receipt, $request->validated());

        return redirect()->route('admin.receipts.show', $receipt)->with('success', 'Receipt updated successfully.');
    }

    public function destroy(Receipt $receipt): RedirectResponse
    {
        $this->authorize('delete', $receipt);
        $this->service->delete($receipt);

        return redirect()->route('admin.receipts.index')->with('success', 'Receipt deleted successfully.');
    }

    public function restore(Receipt $receipt): RedirectResponse
    {
        $this->authorize('restore', $receipt);
        $receipt->restore();

        return redirect()->route('admin.receipts.index')->with('success', 'Restored successfully.');
    }

    public function forceDelete(Receipt $receipt): RedirectResponse
    {
        $this->authorize('forceDelete', $receipt);
        $receipt->forceDelete();

        return redirect()->route('admin.receipts.index')->with('success', 'Permanently deleted.');
    }
}
