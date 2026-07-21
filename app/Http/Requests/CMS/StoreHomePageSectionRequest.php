<?php

declare(strict_types=1);

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class StoreHomePageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:home_page_sections,slug'],
            'type' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        // Parse JSON content string to array
        if ($this->has('content') && is_string($this->input('content'))) {
            $content = json_decode($this->input('content'), true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $this->merge(['content' => $content]);
            } else {
                $this->merge(['content' => null]);
            }
        }
    }
}
