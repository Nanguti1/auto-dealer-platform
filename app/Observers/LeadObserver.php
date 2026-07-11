<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Lead;
use Illuminate\Support\Facades\Cache;

class LeadObserver
{
    public function created(Lead $lead): void
    {
        $this->clearDashboardCache();
    }

    public function updated(Lead $lead): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(Lead $lead): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::flush();
    }
}
