<?php

declare(strict_types=1);

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $blogPost = $this->route('blog_post');

        return [
            'blog_category_id' => ['sometimes', 'nullable', 'integer', 'exists:blog_categories,id'],
            'author_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:blog_posts,slug,'.$blogPost],
            'excerpt' => ['sometimes', 'nullable', 'string'],
            'body' => ['sometimes', 'nullable', 'string'],
            'featured_image' => ['sometimes', 'nullable', 'image', 'max:10240'],
            'status' => ['sometimes', 'nullable', 'string', 'in:draft,published,scheduled,archived'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'is_featured' => ['sometimes', 'nullable', 'boolean'],
        ];
    }
}
