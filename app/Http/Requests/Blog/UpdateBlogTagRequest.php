<?php

declare(strict_types=1);

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:blog_tags,slug,'.$this->route('blogTag')->id],
            'color' => ['nullable', 'string', 'max:7'],
            'usage_count' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
