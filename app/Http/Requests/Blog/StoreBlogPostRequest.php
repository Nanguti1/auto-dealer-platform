<?php

declare(strict_types=1);

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogPostRequest extends FormRequest
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
        return [
            'blog_category_id' => ['required', 'integer', 'exists:blog_categories,id'],
            'author_id' => ['required', 'integer', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:blog_posts,slug'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:10240'],
            'status' => ['required', 'string', 'in:draft,published,scheduled,archived'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['nullable', 'boolean'],
        ];
    }
}
