<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CRM;

use App\Http\Controllers\Controller;
use App\Http\Requests\CRM\StoreActivityRequest;
use App\Http\Requests\CRM\UpdateActivityRequest;
use App\Models\CrmFollowUp;
use App\Models\Lead;
use App\Models\User;
use App\Services\CRM\ActivityService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function __construct(private readonly ActivityService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', CrmFollowUp::class);

        return Inertia::render('Admin/CRM/Activities/Index', [
            'activities' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', CrmFollowUp::class);

        return Inertia::render('Admin/CRM/Activities/Create', [
            'leads' => Lead::select('id', 'first_name', 'last_name', 'email')
                ->orderBy('last_name')
                ->orderBy('first_name')
                ->get()
                ->map(fn ($lead) => [
                    'id' => $lead->id,
                    'name' => $lead->first_name.' '.$lead->last_name.' ('.$lead->email.')',
                ]),
            'users' => User::select('id', 'name', 'email')
                ->orderBy('name')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name.' ('.$user->email.')',
                ]),
        ]);
    }

    public function store(StoreActivityRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.activities.index')->with('success', 'Created successfully.');
    }

    public function show(CrmFollowUp $activity): Response
    {
        $this->authorize('view', $activity);

        return Inertia::render('Admin/CRM/Activities/Show', [
            'activity' => $activity->load('lead', 'assignedUser'),
        ]);
    }

    public function edit(CrmFollowUp $activity): Response
    {
        $this->authorize('update', $activity);

        return Inertia::render('Admin/CRM/Activities/Edit', [
            'activity' => $activity->load('lead', 'assignedUser'),
            'leads' => Lead::select('id', 'first_name', 'last_name', 'email')
                ->orderBy('last_name')
                ->orderBy('first_name')
                ->get()
                ->map(fn ($lead) => [
                    'id' => $lead->id,
                    'name' => $lead->first_name.' '.$lead->last_name.' ('.$lead->email.')',
                ]),
            'users' => User::select('id', 'name', 'email')
                ->orderBy('name')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name.' ('.$user->email.')',
                ]),
        ]);
    }

    public function update(UpdateActivityRequest $request, CrmFollowUp $activity): RedirectResponse
    {
        $this->service->update($activity, $request->validated());

        return redirect()->route('admin.activities.show', $activity)->with('success', 'Updated successfully.');
    }

    public function destroy(CrmFollowUp $activity): RedirectResponse
    {
        $this->authorize('delete', $activity);
        $this->service->delete($activity);

        return redirect()->route('admin.activities.index')->with('success', 'Deleted successfully.');
    }
}
