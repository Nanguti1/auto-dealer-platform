<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\TradeInRequest;
use Illuminate\Support\Facades\Cache;

class TradeInRequestObserver
{
    public function created(TradeInRequest $request): void
    {
        $this->clearDashboardCache();
    }

    public function updated(TradeInRequest $request): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(TradeInRequest $request): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::tags(['dashboard', 'summary', 'charts'])->flush();
    }
}
