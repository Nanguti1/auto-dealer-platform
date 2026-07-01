<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Models\Branch;
use App\Models\User;
use App\Services\Users\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(private readonly UserService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', User::class);

        return Inertia::render('Admin/Users/Index', [
            'users' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', User::class);

        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::all(),
            'branches' => Branch::all(),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.users.index')->with('success', 'Created successfully.');
    }

    public function show(User $user): Response
    {
        $this->authorize('view', $user);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user->load('roles', 'permissions', 'branch'),
        ]);
    }

    public function edit(User $user): Response
    {
        $this->authorize('update', $user);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user->load('roles', 'permissions', 'branch'),
            'roles' => Role::all(),
            'branches' => Branch::all(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->service->update($user, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('delete', $user);
        $this->service->delete($user);

        return redirect()->route('admin.users.index')->with('success', 'Deleted successfully.');
    }
}
