<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Events\VehicleUpdated;
use App\Models\Vehicle;
use App\Services\Inventory\VehicleService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class UpdateVehicleAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(Vehicle $vehicle, array $data): EloquentModel
    {
        $vehicle = $this->service->update($vehicle, $data);

        event(new VehicleUpdated($vehicle));

        return $vehicle;
    }
}
