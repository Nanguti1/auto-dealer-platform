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

        return [
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:dynamic_cms_pages,slug,'.$cmsPage],
            'body' => ['sometimes', 'nullable', 'string'],
            'content' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'nullable', 'string', 'in:draft,published,archived'],
            'published_at' => ['sometimes', 'nullable', 'date'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('content') && ! $this->has('body')) {
            $this->merge(['body' => $this->input('content')]);
        }
    }
}
