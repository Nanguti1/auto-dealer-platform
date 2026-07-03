<?php

declare(strict_types=1);

namespace App\Services\VehicleFeatures;

use App\Models\VehicleFeature;
use App\Services\Concerns\ManagesEloquentModels;

class VehicleFeatureService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleFeature::class;
    }
}
