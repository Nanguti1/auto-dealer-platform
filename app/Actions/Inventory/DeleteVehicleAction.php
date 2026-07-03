<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use App\Models\Vehicle;
use App\Services\Inventory\VehicleService;

class DeleteVehicleAction
{
    public function __construct(private readonly VehicleService $service) {}

    public function __invoke(Vehicle $vehicle): void
    {
        $this->service->delete($vehicle);
    }
}
