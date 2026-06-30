<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\SeoMetadata;
use App\Services\Concerns\ManagesEloquentModels;

class SeoMetadataService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return SeoMetadata::class;
    }
}
