<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\VehicleCondition;
use Illuminate\Support\Facades\Cache;

class VehicleConditionObserver
{
    public function created(VehicleCondition $condition): void
    {
        $this->clearReferenceCache();
    }

    public function updated(VehicleCondition $condition): void
    {
        $this->clearReferenceCache();
    }

    public function deleted(VehicleCondition $condition): void
    {
        $this->clearReferenceCache();
    }

    protected function clearReferenceCache(): void
    {
        Cache::flush();
    }
}
