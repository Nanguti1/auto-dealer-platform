<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $service) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Dashboard/Index', [
            'dashboard' => $this->service->paginate($request->query()),
            'summary' => $this->service->summary(),
            'recentActivity' => $this->service->recentActivity(),
            'filters' => $request->query(),
        ]);
    }
}
