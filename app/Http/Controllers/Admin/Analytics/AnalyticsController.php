<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Analytics;

use App\Http\Controllers\Controller;
use App\Http\Requests\Analytics\StoreAnalyticsDataRequest;
use App\Http\Requests\Analytics\UpdateAnalyticsDataRequest;
use App\Models\AnalyticsData;
use App\Services\Analytics\AnalyticsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __construct(private readonly AnalyticsService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', AnalyticsData::class);

        return Inertia::render('Admin/Analytics/Index/Index', [
            'analytics' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', AnalyticsData::class);

        return Inertia::render('Admin/Analytics/Index/Create');
    }

    public function store(StoreAnalyticsDataRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.analytics.index')->with('success', 'Created successfully.');
    }

    public function show(AnalyticsData $analyticsData): Response
    {
        $this->authorize('view', $analyticsData);

        return Inertia::render('Admin/Analytics/Index/Show', [
            'analyticsData' => $analyticsData,
        ]);
    }

    public function edit(AnalyticsData $analyticsData): Response
    {
        $this->authorize('update', $analyticsData);

        return Inertia::render('Admin/Analytics/Index/Edit', [
            'analyticsData' => $analyticsData,
        ]);
    }

    public function update(UpdateAnalyticsDataRequest $request, AnalyticsData $analyticsData): RedirectResponse
    {
        $this->service->update($analyticsData, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(AnalyticsData $analyticsData): RedirectResponse
    {
        $this->authorize('delete', $analyticsData);
        $this->service->delete($analyticsData);

        return redirect()->route('admin.analytics.index')->with('success', 'Deleted successfully.');
    }
}
