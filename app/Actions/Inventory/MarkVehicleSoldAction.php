<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Models\Vehicle;
use App\Services\Inventory\VehicleService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class MarkVehicleSoldAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(Vehicle $vehicle): EloquentModel
    {
        return $this->service->markSold($vehicle);
    }
}
