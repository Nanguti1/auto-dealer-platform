<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\VehicleReservation;
use Illuminate\Support\Facades\Cache;

class VehicleReservationObserver
{
    public function created(VehicleReservation $reservation): void
    {
        $this->clearDashboardCache();
    }

    public function updated(VehicleReservation $reservation): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(VehicleReservation $reservation): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::tags(['dashboard', 'summary', 'activity', 'charts'])->flush();
    }
}
