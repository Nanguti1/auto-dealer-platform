<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\VehicleReservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class VehicleReservationObserver
{
    public function creating(VehicleReservation $reservation): void
    {
        if (Auth::check() && ! $reservation->created_by) {
            $reservation->created_by = Auth::id();
        }
    }

    public function updating(VehicleReservation $reservation): void
    {
        if (Auth::check()) {
            $reservation->updated_by = Auth::id();
        }
    }

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
