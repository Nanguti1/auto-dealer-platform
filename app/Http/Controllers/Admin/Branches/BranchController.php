<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Branches;

use App\Http\Controllers\Controller;
use App\Http\Requests\Branches\StoreBranchRequest;
use App\Http\Requests\Branches\UpdateBranchRequest;
use App\Models\Branch;
use App\Services\Branches\BranchService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function __construct(private readonly BranchService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Branch::class);

        return Inertia::render('Admin/Branches/Index', [
            'branches' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Branch::class);

        return Inertia::render('Admin/Branches/Create');
    }

    public function store(StoreBranchRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.branches.index')->with('success', 'Branch created successfully.');
    }

    public function show(Branch $branch): Response
    {
        $this->authorize('view', $branch);

        return Inertia::render('Admin/Branches/Show', [
            'branch' => $branch->load(['users' => fn ($q) => $q->limit(5), 'vehicles' => fn ($q) => $q->limit(5)]),
        ]);
    }

    public function edit(Branch $branch): Response
    {
        $this->authorize('update', $branch);

        return Inertia::render('Admin/Branches/Edit', [
            'branch' => $branch,
        ]);
    }

    public function update(UpdateBranchRequest $request, Branch $branch): RedirectResponse
    {
        $this->service->update($branch, $request->validated());

        return redirect()->route('admin.branches.show', $branch)->with('success', 'Branch updated successfully.');
    }

    public function destroy(Branch $branch): RedirectResponse
    {
        $this->authorize('delete', $branch);
        $this->service->delete($branch);

        return redirect()->route('admin.branches.index')->with('success', 'Branch deleted successfully.');
    }
}
