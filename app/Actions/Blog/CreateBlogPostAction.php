<?php

declare(strict_types=1);

namespace App\Actions\Blog;

use App\Services\Blog\BlogService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateBlogPostAction
{
    public function __construct(private readonly BlogService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
