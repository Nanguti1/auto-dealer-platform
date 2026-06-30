<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\HomePageSection;
use App\Services\Concerns\ManagesEloquentModels;

class HomePageSectionService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return HomePageSection::class;
    }
}
