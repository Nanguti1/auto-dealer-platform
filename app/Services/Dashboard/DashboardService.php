<?php

declare(strict_types=1);

namespace App\Services\Dashboard;

use App\Models\Vehicle;
use App\Services\Concerns\ManagesEloquentModels;

class DashboardService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Vehicle::class;
    }

}
