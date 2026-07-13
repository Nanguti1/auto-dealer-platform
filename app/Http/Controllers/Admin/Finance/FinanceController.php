<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Finance;

use App\Events\FinanceApplicationSubmitted;
use App\Http\Controllers\Controller;
use App\Http\Requests\Finance\StoreFinanceApplicationRequest;
use App\Http\Requests\Finance\UpdateFinanceApplicationRequest;
use App\Models\FinanceApplication;
use App\Models\Lender;
use App\Models\User;
use App\Models\Vehicle;
use App\Services\Finance\FinanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function __construct(private readonly FinanceService $service) {}

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

        return Inertia::render('Admin/Finance/Applications/Create', [
            'users' => User::select('id', 'name', 'email')->get(),
            'lenders' => Lender::select('id', 'name')->get(),
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                ]),
        ]);
    }

    public function store(StoreFinanceApplicationRequest $request): RedirectResponse
    {
        $financeApplication = $this->service->create($request->validated());

        event(new FinanceApplicationSubmitted($financeApplication));

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
            'users' => User::select('id', 'name', 'email')->get(),
            'lenders' => Lender::select('id', 'name')->get(),
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                ]),
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

    public function restore(FinanceApplication $financeApplication): RedirectResponse
    {
        $this->authorize('restore', $financeApplication);
        $financeApplication->restore();

        return redirect()->route('admin.finance-applications.index')->with('success', 'Restored successfully.');
    }

    public function forceDelete(FinanceApplication $financeApplication): RedirectResponse
    {
        $this->authorize('forceDelete', $financeApplication);
        $financeApplication->forceDelete();

        return redirect()->route('admin.finance-applications.index')->with('success', 'Permanently deleted.');
    }
}
