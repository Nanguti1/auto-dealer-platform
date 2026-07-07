<?php

declare(strict_types=1);

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class StoreCmsPageRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:dynamic_cms_pages,slug'],
            'body' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:draft,published,archived'],
            'published_at' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('content') && ! $this->has('body')) {
            $this->merge(['body' => $this->input('content')]);
        }
    }
}
