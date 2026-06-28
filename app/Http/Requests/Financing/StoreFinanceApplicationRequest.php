<?php

declare(strict_types=1);

namespace App\Http\Requests\Financing;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinanceApplicationRequest extends FormRequest
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
            'status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
