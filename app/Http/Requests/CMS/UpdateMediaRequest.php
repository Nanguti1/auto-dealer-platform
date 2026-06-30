<?php

declare(strict_types=1);

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'file_name' => ['sometimes', 'string', 'max:255'],
            'mime_type' => ['sometimes', 'string', 'max:100'],
            'file_size' => ['sometimes', 'integer', 'min:0'],
            'path' => ['sometimes', 'string', 'max:500'],
            'disk' => ['nullable', 'string', 'max:50'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'is_public' => ['nullable', 'boolean'],
        ];
    }
}
