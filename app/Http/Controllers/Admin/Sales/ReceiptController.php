<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreReceiptRequest;
use App\Http\Requests\Sales\UpdateReceiptRequest;
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

        return Inertia::render('Admin/Sales/Receipts/Create');
    }

    public function store(StoreReceiptRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.receipts.index')->with('success', 'Receipt created successfully.');
    }

    public function show(Receipt $receipt): Response
    {
        $this->authorize('view', $receipt);

        return Inertia::render('Admin/Sales/Receipts/Show', [
            'receipt' => $receipt->load(['payment', 'invoice', 'user']),
        ]);
    }

    public function edit(Receipt $receipt): Response
    {
        $this->authorize('update', $receipt);

        return Inertia::render('Admin/Sales/Receipts/Edit', [
            'receipt' => $receipt->load(['payment', 'invoice', 'user']),
        ]);
    }

    public function update(UpdateReceiptRequest $request, Receipt $receipt): RedirectResponse
    {
        $this->service->update($receipt, $request->validated());

        return back()->with('success', 'Receipt updated successfully.');
    }

    public function destroy(Receipt $receipt): RedirectResponse
    {
        $this->authorize('delete', $receipt);
        $this->service->delete($receipt);

        return redirect()->route('admin.receipts.index')->with('success', 'Receipt deleted successfully.');
    }
}
