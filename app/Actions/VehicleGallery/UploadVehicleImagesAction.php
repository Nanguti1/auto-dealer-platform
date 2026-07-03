<?php

declare(strict_types=1);

namespace App\Actions\VehicleGallery;

use App\Services\VehicleGallery\VehicleGalleryService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class UploadVehicleImagesAction
{
    public function __construct(private readonly VehicleGalleryService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
