<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreRefundRequest;
use App\Http\Requests\Sales\UpdateRefundRequest;
use App\Models\Refund;
use App\Services\Sales\RefundService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RefundController extends Controller
{
    public function __construct(private readonly RefundService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Refund::class);

        return Inertia::render('Admin/Sales/Refunds/Index', [
            'refunds' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Refund::class);

        return Inertia::render('Admin/Sales/Refunds/Create');
    }

    public function store(StoreRefundRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.refunds.index')->with('success', 'Refund created successfully.');
    }

    public function show(Refund $refund): Response
    {
        $this->authorize('view', $refund);

        return Inertia::render('Admin/Sales/Refunds/Show', [
            'refund' => $refund->load(['payment', 'invoice', 'user']),
        ]);
    }

    public function edit(Refund $refund): Response
    {
        $this->authorize('update', $refund);

        return Inertia::render('Admin/Sales/Refunds/Edit', [
            'refund' => $refund->load(['payment', 'invoice', 'user']),
        ]);
    }

    public function update(UpdateRefundRequest $request, Refund $refund): RedirectResponse
    {
        $this->service->update($refund, $request->validated());

        return back()->with('success', 'Refund updated successfully.');
    }

    public function process(Refund $refund): RedirectResponse
    {
        $this->authorize('update', $refund);
        $this->service->process($refund);

        return back()->with('success', 'Refund processed successfully.');
    }

    public function destroy(Refund $refund): RedirectResponse
    {
        $this->authorize('delete', $refund);
        $this->service->delete($refund);

        return redirect()->route('admin.refunds.index')->with('success', 'Refund deleted successfully.');
    }

    public function restore(Refund $refund): RedirectResponse
    {
        $this->authorize('restore', $refund);
        $refund->restore();

        return redirect()->route('admin.refunds.index')->with('success', 'Restored successfully.');
    }

    public function forceDelete(Refund $refund): RedirectResponse
    {
        $this->authorize('forceDelete', $refund);
        $refund->forceDelete();

        return redirect()->route('admin.refunds.index')->with('success', 'Permanently deleted.');
    }
}
