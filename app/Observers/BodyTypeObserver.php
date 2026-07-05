<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\BodyType;
use Illuminate\Support\Facades\Cache;

class BodyTypeObserver
{
    public function created(BodyType $bodyType): void
    {
        $this->clearReferenceCache();
    }

    public function updated(BodyType $bodyType): void
    {
        $this->clearReferenceCache();
    }

    public function deleted(BodyType $bodyType): void
    {
        $this->clearReferenceCache();
    }

    protected function clearReferenceCache(): void
    {
        Cache::tags(['reference', 'bodyTypes', 'filters'])->flush();
    }
}
