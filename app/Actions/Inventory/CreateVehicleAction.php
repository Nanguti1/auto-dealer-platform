<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Events\VehicleCreated;
use App\Services\Inventory\VehicleService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateVehicleAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        $vehicle = $this->service->create($data);

        event(new VehicleCreated($vehicle));

        return $vehicle;
    }
}
