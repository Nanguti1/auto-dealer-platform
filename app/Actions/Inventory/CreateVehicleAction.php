<?php

declare(strict_types=1);

namespace App\Actions\Inventory;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Services\Inventory\VehicleService;

class CreateVehicleAction
{
    public function __construct(private readonly VehicleService $service)
    {
    }

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
