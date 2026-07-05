<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\FinanceApplication;
use Illuminate\Support\Facades\Cache;

class FinanceApplicationObserver
{
    public function created(FinanceApplication $application): void
    {
        $this->clearDashboardCache();
    }

    public function updated(FinanceApplication $application): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(FinanceApplication $application): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::tags(['dashboard', 'summary', 'charts'])->flush();
    }
}
