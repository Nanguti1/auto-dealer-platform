<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\TradeIns;

use App\Http\Controllers\Controller;
use App\Http\Requests\TradeIns\StoreTradeInRequest;
use App\Http\Requests\TradeIns\UpdateTradeInRequest;
use App\Models\TradeInRequest;
use App\Services\TradeIns\TradeInService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TradeInController extends Controller
{
    public function __construct(private readonly TradeInService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TradeInRequest::class);

        return Inertia::render('Admin/TradeIns/Requests/Index', [
            'tradeIns' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TradeInRequest::class);

        return Inertia::render('Admin/TradeIns/Requests/Create');
    }

    public function store(StoreTradeInRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Convert condition_report from string to array if needed
        if (isset($data['condition_report']) && is_string($data['condition_report'])) {
            $data['condition_report'] = json_decode($data['condition_report'], true) ?? [];
        }

        $this->service->create($data);

        return redirect()->route('admin.trade-ins.index')->with('success', 'Created successfully.');
    }

    public function show($tradeIn): Response
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('view', $tradeInRequest);

        return Inertia::render('Admin/TradeIns/Requests/Show', [
            'tradeInRequest' => $tradeInRequest->load(['user', 'vehicle', 'valuations', 'inspections', 'offers']),
        ]);
    }

    public function edit($tradeIn): Response
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('update', $tradeInRequest);

        return Inertia::render('Admin/TradeIns/Requests/Edit', [
            'tradeInRequest' => $tradeInRequest,
        ]);
    }

    public function update(UpdateTradeInRequest $request, $tradeIn): RedirectResponse
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('update', $tradeInRequest);

        $data = $request->validated();

        // Convert condition_report from string to array if needed
        if (isset($data['condition_report']) && is_string($data['condition_report'])) {
            $data['condition_report'] = json_decode($data['condition_report'], true) ?? [];
        }

        $this->service->update($tradeInRequest, $data);

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy($tradeIn): RedirectResponse
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('delete', $tradeInRequest);
        $this->service->delete($tradeInRequest);

        return redirect()->route('admin.trade-ins.index')->with('success', 'Deleted successfully.');
    }

    public function approve($tradeIn): RedirectResponse
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('update', $tradeInRequest);
        $this->service->approve($tradeInRequest);

        return back()->with('success', 'Trade-in approved successfully.');
    }

    public function reject($tradeIn): RedirectResponse
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('update', $tradeInRequest);
        $this->service->reject($tradeInRequest);

        return back()->with('success', 'Trade-in rejected successfully.');
    }

    public function convertToInventory($tradeIn): RedirectResponse
    {
        $tradeInRequest = TradeInRequest::findOrFail($tradeIn);
        $this->authorize('update', $tradeInRequest);
        $this->service->convertToInventory($tradeInRequest);

        return redirect()->route('admin.inventory.index')->with('success', 'Trade-in converted to inventory successfully.');
    }
}
