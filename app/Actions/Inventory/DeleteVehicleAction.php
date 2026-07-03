<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Events\VehicleDeleted;
use App\Models\Vehicle;
use App\Services\Inventory\VehicleService;

class DeleteVehicleAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(Vehicle $vehicle): void
    {
        event(new VehicleDeleted($vehicle));

        $this->service->delete($vehicle);
    }
}
