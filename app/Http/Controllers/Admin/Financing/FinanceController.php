<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Financing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Financing\StoreFinanceApplicationRequest;
use App\Http\Requests\Financing\UpdateFinanceApplicationRequest;
use App\Models\FinanceApplication;
use App\Services\Financing\FinanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function __construct(private readonly FinanceService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', FinanceApplication::class);

        return Inertia::render('Admin/Finance/Applications/Index', [
            'financeApplications' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FinanceApplication::class);

        return Inertia::render('Admin/Finance/Applications/Create');
    }

    public function store(StoreFinanceApplicationRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.finance-applications.index')->with('success', 'Created successfully.');
    }

    public function show(FinanceApplication $financeApplication): Response
    {
        $this->authorize('view', $financeApplication);

        return Inertia::render('Admin/Finance/Applications/Show', [
            'financeApplication' => $financeApplication,
        ]);
    }

    public function edit(FinanceApplication $financeApplication): Response
    {
        $this->authorize('update', $financeApplication);

        return Inertia::render('Admin/Finance/Applications/Edit', [
            'financeApplication' => $financeApplication,
        ]);
    }

    public function update(UpdateFinanceApplicationRequest $request, FinanceApplication $financeApplication): RedirectResponse
    {
        $this->service->update($financeApplication, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(FinanceApplication $financeApplication): RedirectResponse
    {
        $this->authorize('delete', $financeApplication);
        $this->service->delete($financeApplication);

        return redirect()->route('admin.finance-applications.index')->with('success', 'Deleted successfully.');
    }
}
