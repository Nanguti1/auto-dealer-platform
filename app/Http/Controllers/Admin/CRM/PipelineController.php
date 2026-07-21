<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CRM;

use App\Http\Controllers\Controller;
use App\Http\Requests\CRM\UpdateLeadStageRequest;
use App\Models\Lead;
use App\Services\CRM\PipelineService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PipelineController extends Controller
{
    public function __construct(private readonly PipelineService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Lead::class);

        return Inertia::render('Admin/CRM/Pipeline/Index', [
            'pipeline' => $this->service->getAllLeadsWithStages(),
            'stats' => $this->service->getPipelineStats(),
        ]);
    }

    public function updateStage(UpdateLeadStageRequest $request, Lead $lead): RedirectResponse
    {
        $this->authorize('update', $lead);
        $this->service->updateLeadStage($lead, $request->validated()['crm_stage_id']);

        return redirect()->route('admin.leads.show', $lead)->with('success', 'Lead stage updated successfully.');
    }
}
