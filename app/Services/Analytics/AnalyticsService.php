<?php

declare(strict_types=1);

namespace App\Services\Analytics;

use App\Models\AnalyticsData;
use App\Services\Concerns\ManagesEloquentModels;

class AnalyticsService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return AnalyticsData::class;
    }
}
