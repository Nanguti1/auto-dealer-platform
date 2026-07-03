<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Models\Vehicle;
use App\Services\Inventory\VehicleService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class SyncVehicleFeaturesAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(Vehicle $vehicle, array $featureIds): EloquentModel
    {
        return $this->service->syncFeatures($vehicle, $featureIds);
    }
}
