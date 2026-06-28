<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CRM;

use App\Http\Controllers\Controller;
use App\Http\Requests\CRM\StoreLeadRequest;
use App\Http\Requests\CRM\UpdateLeadRequest;
use App\Models\Lead;
use App\Services\CRM\LeadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function __construct(private readonly LeadService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Lead::class);

        return Inertia::render('Admin/CRM/Leads/Index', [
            'leads' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Lead::class);

        return Inertia::render('Admin/CRM/Leads/Create');
    }

    public function store(StoreLeadRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.leads.index')->with('success', 'Created successfully.');
    }

    public function show(Lead $lead): Response
    {
        $this->authorize('view', $lead);

        return Inertia::render('Admin/CRM/Leads/Show', [
            'lead' => $lead,
        ]);
    }

    public function edit(Lead $lead): Response
    {
        $this->authorize('update', $lead);

        return Inertia::render('Admin/CRM/Leads/Edit', [
            'lead' => $lead,
        ]);
    }

    public function update(UpdateLeadRequest $request, Lead $lead): RedirectResponse
    {
        $this->service->update($lead, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        $this->authorize('delete', $lead);
        $this->service->delete($lead);

        return redirect()->route('admin.leads.index')->with('success', 'Deleted successfully.');
    }
}
