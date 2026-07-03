<?php

declare(strict_types=1);

namespace App\Actions\Imports;

use App\Models\VehicleImport;
use App\Services\Imports\ImportService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class UpdateShipmentStatusAction
{
    public function __construct(private readonly ImportService $service) {}

    public function __invoke(VehicleImport $vehicleImport, string $status): EloquentModel
    {
        return $this->service->update($vehicleImport, ['status' => $status]);
    }
}
