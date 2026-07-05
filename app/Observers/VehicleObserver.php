<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\Cache;

class VehicleObserver
{
    public function created(Vehicle $vehicle): void
    {
        $this->clearVehicleCache();
    }

    public function updated(Vehicle $vehicle): void
    {
        $this->clearVehicleCache();
    }

    public function deleted(Vehicle $vehicle): void
    {
        $this->clearVehicleCache();
    }

    protected function clearVehicleCache(): void
    {
        Cache::tags(['vehicle', 'filters'])->flush();
    }
}
