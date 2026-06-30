<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StorePermissionRequest;
use App\Http\Requests\Users\UpdatePermissionRequest;
use App\Models\Permission;
use App\Services\Users\PermissionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function __construct(private readonly PermissionService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Permission::class);

        return Inertia::render('Admin/Users/Permissions/Index', [
            'permissions' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Permission::class);

        return Inertia::render('Admin/Users/Permissions/Create');
    }

    public function store(StorePermissionRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.permissions.index')->with('success', 'Created successfully.');
    }

    public function show(Permission $permission): Response
    {
        $this->authorize('view', $permission);

        return Inertia::render('Admin/Users/Permissions/Show', [
            'permission' => $permission->load('roles'),
        ]);
    }

    public function edit(Permission $permission): Response
    {
        $this->authorize('update', $permission);

        return Inertia::render('Admin/Users/Permissions/Edit', [
            'permission' => $permission->load('roles'),
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        $this->service->update($permission, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $this->authorize('delete', $permission);
        $this->service->delete($permission);

        return redirect()->route('admin.permissions.index')->with('success', 'Deleted successfully.');
    }
}
