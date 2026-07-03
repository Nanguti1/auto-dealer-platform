<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Models\VehicleImport;
use App\Services\Concerns\ManagesEloquentModels;

class ImportService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleImport::class;
    }
}
