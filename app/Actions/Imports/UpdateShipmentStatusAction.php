<?php

declare(strict_types=1);

namespace App\Actions\Imports;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\Vehicle;
use App\Models\VehicleImport;
use App\Services\Imports\ImportService;

class UpdateShipmentStatusAction
{
    public function __construct(private readonly ImportService $service)
    {
    }

    public function __invoke(VehicleImport $vehicleImport, string $status): EloquentModel
    {
        return $this->service->update($vehicleImport, ['status' => $status]);
    }
}
