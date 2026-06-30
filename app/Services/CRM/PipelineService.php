<?php

declare(strict_types=1);

namespace App\Services\CRM;

use App\Models\CrmStage;
use App\Models\Lead;
use Illuminate\Database\Eloquent\Collection;

class PipelineService
{
    public function getStages(): Collection
    {
        return CrmStage::query()
            ->orderBy('sort_order')
            ->get();
    }

    public function getLeadsByStage(int $stageId): Collection
    {
        return Lead::query()
            ->where('crm_stage_id', $stageId)
            ->with(['vehicle', 'assignedUser'])
            ->latest()
            ->get();
    }

    public function getAllLeadsWithStages(): array
    {
        $stages = $this->getStages();
        $pipeline = [];

        foreach ($stages as $stage) {
            $pipeline[$stage->id] = [
                'stage' => $stage,
                'leads' => $this->getLeadsByStage($stage->id),
            ];
        }

        return $pipeline;
    }

    public function updateLeadStage(Lead $lead, int $stageId): Lead
    {
        $lead->update(['crm_stage_id' => $stageId]);

        return $lead->fresh();
    }

    public function getPipelineStats(): array
    {
        $stages = $this->getStages();
        $stats = [];

        foreach ($stages as $stage) {
            $stats[$stage->id] = [
                'stage' => $stage,
                'count' => Lead::query()->where('crm_stage_id', $stage->id)->count(),
            ];
        }

        return $stats;
    }
}
