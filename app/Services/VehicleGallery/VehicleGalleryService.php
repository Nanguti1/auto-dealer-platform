<?php

declare(strict_types=1);

namespace App\Services\VehicleGallery;

use App\Models\VehicleGallery;
use App\Services\Concerns\ManagesEloquentModels;

class VehicleGalleryService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleGallery::class;
    }

}
