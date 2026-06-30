<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Models\BlogCategory;
use App\Services\Concerns\ManagesEloquentModels;

class BlogCategoryService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return BlogCategory::class;
    }
}
