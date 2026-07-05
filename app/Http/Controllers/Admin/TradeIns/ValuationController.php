<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\TradeIns;

use App\Http\Controllers\Controller;
use App\Http\Requests\TradeIns\StoreValuationRequest;
use App\Http\Requests\TradeIns\UpdateValuationRequest;
use App\Models\TradeInRequest;
use App\Models\TradeInValuation;
use App\Models\User;
use App\Services\TradeIns\ValuationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ValuationController extends Controller
{
    public function __construct(private readonly ValuationService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TradeInValuation::class);

        return Inertia::render('Admin/TradeIns/Valuations/Index', [
            'valuations' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TradeInValuation::class);

        return Inertia::render('Admin/TradeIns/Valuations/Create', [
            'tradeInRequests' => TradeInRequest::select('id', 'make', 'model', 'year')->get(),
            'users' => User::select('id', 'name', 'email')->get(),
        ]);
    }

    public function store(StoreValuationRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.valuations.index')->with('success', 'Valuation created successfully.');
    }

    public function show(TradeInValuation $valuation): Response
    {
        $this->authorize('view', $valuation);

        return Inertia::render('Admin/TradeIns/Valuations/Show', [
            'valuation' => $valuation->load(['tradeInRequest', 'valuationSource']),
        ]);
    }

    public function edit(TradeInValuation $valuation): Response
    {
        $this->authorize('update', $valuation);

        return Inertia::render('Admin/TradeIns/Valuations/Edit', [
            'valuation' => $valuation->load(['tradeInRequest', 'valuationSource']),
            'tradeInRequests' => \App\Models\TradeInRequest::select('id', 'make', 'model', 'year')->get(),
            'users' => \App\Models\User::select('id', 'name', 'email')->get(),
        ]);
    }

    public function update(UpdateValuationRequest $request, TradeInValuation $valuation): RedirectResponse
    {
        $this->service->update($valuation, $request->validated());

        return back()->with('success', 'Valuation updated successfully.');
    }

    public function destroy(TradeInValuation $valuation): RedirectResponse
    {
        $this->authorize('delete', $valuation);
        $this->service->delete($valuation);

        return redirect()->route('admin.valuations.index')->with('success', 'Valuation deleted successfully.');
    }
}
