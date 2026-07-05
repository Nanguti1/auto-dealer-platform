<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Make;
use Illuminate\Support\Facades\Cache;

class MakeObserver
{
    public function created(Make $make): void
    {
        $this->clearReferenceCache();
    }

    public function updated(Make $make): void
    {
        $this->clearReferenceCache();
    }

    public function deleted(Make $make): void
    {
        $this->clearReferenceCache();
    }

    protected function clearReferenceCache(): void
    {
        Cache::tags(['reference', 'makes', 'filters'])->flush();
    }
}
