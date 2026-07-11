<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\FinanceApplication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class FinanceApplicationObserver
{
    public function creating(FinanceApplication $application): void
    {
        if (Auth::check() && ! $application->created_by) {
            $application->created_by = Auth::id();
        }
    }

    public function updating(FinanceApplication $application): void
    {
        if (Auth::check()) {
            $application->updated_by = Auth::id();
        }
    }

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
        Cache::flush();
    }
}
