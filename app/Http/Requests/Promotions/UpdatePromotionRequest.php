<?php

declare(strict_types=1);

namespace App\Http\Requests\Promotions;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePromotionRequest extends FormRequest
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
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:promotions,slug,'.$this->route('promotion')],
            'type' => ['sometimes', 'nullable', 'string', 'in:discount,seasonal,featured_vehicle,finance'],
            'value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'is_active' => ['nullable', 'boolean'],
            'rules' => ['nullable', 'array'],
            'banner' => ['nullable', 'image', 'max:10240'],
        ];
    }
}
