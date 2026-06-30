<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Models\BlogTag;
use App\Services\Concerns\ManagesEloquentModels;

class BlogTagService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return BlogTag::class;
    }
}
