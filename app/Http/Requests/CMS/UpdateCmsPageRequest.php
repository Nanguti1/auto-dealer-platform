<?php

declare(strict_types=1);

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCmsPageRequest extends FormRequest
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
        $cmsPage = $this->route('cms_page');
        $cmsPageId = is_object($cmsPage) ? $cmsPage->id : $cmsPage;

        return [
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:dynamic_cms_pages,slug,'.$cmsPageId],
            'body' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'nullable', 'string', 'in:draft,published,archived'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'is_visible' => ['sometimes', 'nullable', 'boolean'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string'],
        ];
    }

    protected function prepareForValidation(): void
    {
        // Map frontend 'content' field to 'body' field for backward compatibility
        if ($this->has('content') && ! $this->has('body')) {
            $this->merge(['body' => $this->input('content')]);
        }
    }
}
