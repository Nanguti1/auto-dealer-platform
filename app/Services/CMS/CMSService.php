<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\DynamicCmsPage;
use App\Services\Concerns\ManagesEloquentModels;

class CMSService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return DynamicCmsPage::class;
    }

}
