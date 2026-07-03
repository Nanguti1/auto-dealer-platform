<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Events\BlogPublished;
use App\Models\BlogPost;
use App\Services\Concerns\ManagesEloquentModels;

class BlogService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return BlogPost::class;
    }

    public function publish(BlogPost $blogPost): BlogPost
    {
        $blogPost = $this->update($blogPost, [
            'status' => 'published',
            'published_at' => now(),
        ]);

        event(new BlogPublished($blogPost));

        return $blogPost;
    }
}
