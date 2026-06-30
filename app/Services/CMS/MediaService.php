<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\Media;
use App\Services\Concerns\ManagesEloquentModels;

class MediaService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Media::class;
    }
}
