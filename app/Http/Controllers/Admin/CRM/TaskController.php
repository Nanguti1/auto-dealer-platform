<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CRM;

use App\Http\Controllers\Controller;
use App\Http\Requests\CRM\StoreTaskRequest;
use App\Http\Requests\CRM\UpdateTaskRequest;
use App\Models\CrmTask;
use App\Services\CRM\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function __construct(private readonly TaskService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', CrmTask::class);

        return Inertia::render('Admin/CRM/Tasks/Index', [
            'tasks' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', CrmTask::class);

        return Inertia::render('Admin/CRM/Tasks/Create');
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.tasks.index')->with('success', 'Created successfully.');
    }

    public function show(CrmTask $task): Response
    {
        $this->authorize('view', $task);

        return Inertia::render('Admin/CRM/Tasks/Show', [
            'task' => $task->load('lead', 'assignedUser'),
        ]);
    }

    public function edit(CrmTask $task): Response
    {
        $this->authorize('update', $task);

        return Inertia::render('Admin/CRM/Tasks/Edit', [
            'task' => $task->load('lead', 'assignedUser'),
        ]);
    }

    public function update(UpdateTaskRequest $request, CrmTask $task): RedirectResponse
    {
        $this->service->update($task, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(CrmTask $task): RedirectResponse
    {
        $this->authorize('delete', $task);
        $this->service->delete($task);

        return redirect()->route('admin.tasks.index')->with('success', 'Deleted successfully.');
    }
}
