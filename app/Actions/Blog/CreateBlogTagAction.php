<?php

declare(strict_types=1);

namespace App\Actions\Blog;

use App\Models\BlogTag;
use App\Services\Blog\BlogTagService;

class CreateBlogTagAction
{
    public function __construct(private readonly BlogTagService $service) {}

    public function __invoke(array $data): BlogTag
    {
        return $this->service->create($data);
    }
}
