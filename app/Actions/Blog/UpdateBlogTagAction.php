<?php

declare(strict_types=1);

namespace App\Actions\Blog;

use App\Models\BlogTag;
use App\Services\Blog\BlogTagService;

class UpdateBlogTagAction
{
    public function __construct(private readonly BlogTagService $service) {}

    public function __invoke(BlogTag $blogTag, array $data): BlogTag
    {
        return $this->service->update($blogTag, $data);
    }
}
