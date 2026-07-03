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
        $this->service->create($request->validated());

        return redirect()->route('admin.trade-ins.index')->with('success', 'Created successfully.');
    }

    public function show(TradeInRequest $tradeInRequest): Response
    {
        $this->authorize('view', $tradeInRequest);

        return Inertia::render('Admin/TradeIns/Requests/Show', [
            'tradeInRequest' => $tradeInRequest,
        ]);
    }

    public function edit(TradeInRequest $tradeInRequest): Response
    {
        $this->authorize('update', $tradeInRequest);

        return Inertia::render('Admin/TradeIns/Requests/Edit', [
            'tradeInRequest' => $tradeInRequest,
        ]);
    }

    public function update(UpdateTradeInRequest $request, TradeInRequest $tradeInRequest): RedirectResponse
    {
        $this->service->update($tradeInRequest, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(TradeInRequest $tradeInRequest): RedirectResponse
    {
        $this->authorize('delete', $tradeInRequest);
        $this->service->delete($tradeInRequest);

        return redirect()->route('admin.trade-ins.index')->with('success', 'Deleted successfully.');
    }
}
