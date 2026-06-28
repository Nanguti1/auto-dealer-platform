<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Models\BlogPost;
use App\Services\Concerns\ManagesEloquentModels;

class BlogService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return BlogPost::class;
    }

}
