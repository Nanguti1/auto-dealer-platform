<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Analytics;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsData;
use App\Services\Analytics\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __construct(private readonly AnalyticsService $service) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Analytics/Index', [
            'analytics' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function show(AnalyticsData $analyticsData): Response
    {
        return Inertia::render('Admin/Analytics/Show', [
            'analyticsData' => $analyticsData,
        ]);
    }
}
