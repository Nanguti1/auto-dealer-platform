<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\VehicleImport;
use Illuminate\Support\Facades\Cache;

class VehicleImportObserver
{
    public function created(VehicleImport $import): void
    {
        $this->clearDashboardCache();
    }

    public function updated(VehicleImport $import): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(VehicleImport $import): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::tags(['dashboard', 'summary', 'charts'])->flush();
    }
}
