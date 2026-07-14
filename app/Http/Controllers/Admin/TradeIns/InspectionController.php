<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\TradeIns;

use App\Http\Controllers\Controller;
use App\Http\Requests\TradeIns\StoreInspectionRequest;
use App\Http\Requests\TradeIns\UpdateInspectionRequest;
use App\Models\TradeInInspection;
use App\Models\TradeInRequest;
use App\Services\TradeIns\InspectionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InspectionController extends Controller
{
    public function __construct(private readonly InspectionService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TradeInInspection::class);

        return Inertia::render('Admin/TradeIns/Inspections/Index', [
            'inspections' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(Request $request, ?int $tradeIn = null): Response
    {
        $this->authorize('create', TradeInInspection::class);

        $tradeInRequest = null;
        if ($tradeIn) {
            $tradeInRequest = TradeInRequest::find($tradeIn);
        } elseif ($request->has('trade_in')) {
            $tradeInRequest = TradeInRequest::find($request->input('trade_in'));
        }

        return Inertia::render('Admin/TradeIns/Inspections/Create', [
            'tradeInRequest' => $tradeInRequest,
        ]);
    }

    public function store(StoreInspectionRequest $request, ?int $tradeIn = null): RedirectResponse
    {
        $this->service->create($request->validated());

        if ($tradeIn) {
            return redirect()->route('admin.trade-ins.show', $tradeIn)->with('success', 'Inspection created successfully.');
        }

        return redirect()->route('admin.inspections.index')->with('success', 'Inspection created successfully.');
    }

    public function show(TradeInInspection $inspection): Response
    {
        $this->authorize('view', $inspection);

        return Inertia::render('Admin/TradeIns/Inspections/Show', [
            'inspection' => $inspection->load(['tradeInRequest', 'inspector']),
        ]);
    }

    public function edit(TradeInInspection $inspection): Response
    {
        $this->authorize('update', $inspection);

        return Inertia::render('Admin/TradeIns/Inspections/Edit', [
            'inspection' => $inspection->load(['tradeInRequest', 'inspector']),
        ]);
    }

    public function update(UpdateInspectionRequest $request, TradeInInspection $inspection): RedirectResponse
    {
        $this->service->update($inspection, $request->validated());

        return back()->with('success', 'Inspection updated successfully.');
    }

    public function complete(TradeInInspection $inspection): RedirectResponse
    {
        $this->authorize('update', $inspection);
        $this->service->complete($inspection);

        return back()->with('success', 'Inspection completed successfully.');
    }

    public function destroy(TradeInInspection $inspection): RedirectResponse
    {
        $this->authorize('delete', $inspection);
        $this->service->delete($inspection);

        return redirect()->route('admin.inspections.index')->with('success', 'Inspection deleted successfully.');
    }
}
