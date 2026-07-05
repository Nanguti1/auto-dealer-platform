<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Model;
use Illuminate\Support\Facades\Cache;

class ModelObserver
{
    public function created(Model $model): void
    {
        $this->clearReferenceCache();
    }

    public function updated(Model $model): void
    {
        $this->clearReferenceCache();
    }

    public function deleted(Model $model): void
    {
        $this->clearReferenceCache();
    }

    protected function clearReferenceCache(): void
    {
        Cache::tags(['reference', 'models'])->flush();
    }
}
