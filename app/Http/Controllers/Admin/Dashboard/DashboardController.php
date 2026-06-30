<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreDashboardWidgetRequest;
use App\Http\Requests\Dashboard\UpdateDashboardWidgetRequest;
use App\Models\Vehicle;
use App\Services\Dashboard\DashboardService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Vehicle::class);

        return Inertia::render('Admin/Dashboard/Index/Index', [
            'dashboard' => $this->service->paginate($request->query()),
            'summary' => $this->service->summary(),
            'recentActivity' => $this->service->recentActivity(),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Vehicle::class);

        return Inertia::render('Admin/Dashboard/Index/Create');
    }

    public function store(StoreDashboardWidgetRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.dashboard.index')->with('success', 'Created successfully.');
    }

    public function show(Vehicle $vehicle): Response
    {
        $this->authorize('view', $vehicle);

        return Inertia::render('Admin/Dashboard/Index/Show', [
            'vehicle' => $vehicle,
        ]);
    }

    public function edit(Vehicle $vehicle): Response
    {
        $this->authorize('update', $vehicle);

        return Inertia::render('Admin/Dashboard/Index/Edit', [
            'vehicle' => $vehicle,
        ]);
    }

    public function update(UpdateDashboardWidgetRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->service->update($vehicle, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $this->authorize('delete', $vehicle);
        $this->service->delete($vehicle);

        return redirect()->route('admin.dashboard.index')->with('success', 'Deleted successfully.');
    }
}
