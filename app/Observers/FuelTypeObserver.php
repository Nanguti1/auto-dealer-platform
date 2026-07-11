<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\FuelType;
use Illuminate\Support\Facades\Cache;

class FuelTypeObserver
{
    public function created(FuelType $fuelType): void
    {
        $this->clearReferenceCache();
    }

    public function updated(FuelType $fuelType): void
    {
        $this->clearReferenceCache();
    }

    public function deleted(FuelType $fuelType): void
    {
        $this->clearReferenceCache();
    }

    protected function clearReferenceCache(): void
    {
        Cache::flush();
    }
}
