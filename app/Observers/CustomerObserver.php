<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Customer;
use Illuminate\Support\Facades\Cache;

class CustomerObserver
{
    public function created(Customer $customer): void
    {
        $this->clearDashboardCache();
    }

    public function updated(Customer $customer): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(Customer $customer): void
    {
        $this->clearDashboardCache();
    }

    protected function clearDashboardCache(): void
    {
        Cache::flush();
    }
}
