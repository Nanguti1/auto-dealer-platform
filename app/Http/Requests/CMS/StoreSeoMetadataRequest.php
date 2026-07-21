<?php

declare(strict_types=1);

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeoMetadataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'seoable_type' => ['required', 'string'],
            'seoable_id' => ['required', 'integer'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'canonical_url' => ['nullable', 'string', 'max:500'],
            'open_graph' => ['nullable', 'array'],
            'schema_markup' => ['nullable', 'array'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('open_graph') && is_string($this->input('open_graph'))) {
            $this->merge([
                'open_graph' => json_decode($this->input('open_graph'), true) ?? [],
            ]);
        }

        if ($this->has('schema_markup') && is_string($this->input('schema_markup'))) {
            $this->merge([
                'schema_markup' => json_decode($this->input('schema_markup'), true) ?? [],
            ]);
        }
    }
}
