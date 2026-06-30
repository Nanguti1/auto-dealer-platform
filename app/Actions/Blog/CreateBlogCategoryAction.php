<?php

declare(strict_types=1);

namespace App\Actions\Blog;

use App\Services\Blog\BlogCategoryService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateBlogCategoryAction
{
    public function __construct(private readonly BlogCategoryService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
