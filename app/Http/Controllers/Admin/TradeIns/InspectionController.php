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

    public function create(Request $request, ?TradeInRequest $tradeIn = null): Response
    {
        $this->authorize('create', TradeInInspection::class);

        return Inertia::render('Admin/TradeIns/Inspections/Create', [
            'tradeInRequest' => $tradeIn,
            'tradeInRequests' => TradeInRequest::select('id', 'make', 'model', 'year', 'vin')->get(),
        ]);
    }

    public function store(StoreInspectionRequest $request, ?TradeInRequest $tradeIn = null): RedirectResponse
    {
        $data = $request->validated();

        if ($tradeIn) {
            $data['trade_in_request_id'] = $tradeIn->id;
        }

        $inspection = $this->service->create($data);

        if ($tradeIn) {
            return redirect()->route('admin.trade-ins.show', $tradeIn)->with('success', 'Inspection created successfully.');
        }

        return redirect()->route('admin.inspections.show', $inspection)->with('success', 'Inspection created successfully.');
    }

    public function show(TradeInInspection $inspection): Response
    {
        $this->authorize('view', $inspection);

        return Inertia::render('Admin/TradeIns/Inspections/Show', [
            'inspection' => $inspection->load(['tradeInRequest.user', 'inspector']),
        ]);
    }

    public function edit(TradeInInspection $inspection): Response
    {
        $this->authorize('update', $inspection);

        return Inertia::render('Admin/TradeIns/Inspections/Edit', [
            'inspection' => $inspection->load(['tradeInRequest.user', 'inspector']),
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
