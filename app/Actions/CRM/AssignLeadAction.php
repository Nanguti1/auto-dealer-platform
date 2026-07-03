<?php

declare(strict_types=1);

namespace App\Actions\CRM;

use App\Models\Lead;
use App\Services\CRM\LeadService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class AssignLeadAction
{
    public function __construct(private readonly LeadService $service) {}

    public function __invoke(Lead $lead, int $userId): EloquentModel
    {
        return $this->service->update($lead, ['assigned_user_id' => $userId]);
    }
}
