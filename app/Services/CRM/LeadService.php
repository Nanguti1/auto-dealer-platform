<?php

declare(strict_types=1);

namespace App\Services\CRM;

use App\Models\Lead;
use App\Services\Concerns\ManagesEloquentModels;

class LeadService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Lead::class;
    }

}
