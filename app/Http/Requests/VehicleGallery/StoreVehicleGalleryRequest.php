<?php

declare(strict_types=1);

namespace App\Http\Requests\VehicleGallery;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleGalleryRequest extends FormRequest
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
            'vehicle_id' => ['required', 'integer', 'exists:vehicles,id'],
            'path' => ['required', 'string', 'max:255'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'is_primary' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
            'metadata' => ['nullable', 'array'],
        ];
    }
}
