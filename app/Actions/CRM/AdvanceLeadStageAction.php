<?php

declare(strict_types=1);

namespace App\Actions\CRM;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\Lead;
use App\Services\CRM\LeadService;

class AdvanceLeadStageAction
{
    public function __construct(private readonly LeadService $service)
    {
    }

    public function __invoke(Lead $lead, int $stageId): EloquentModel
    {
        return $this->service->update($lead, ['crm_stage_id' => $stageId]);
    }
}
