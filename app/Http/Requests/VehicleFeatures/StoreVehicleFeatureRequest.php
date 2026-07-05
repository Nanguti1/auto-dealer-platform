<?php

declare(strict_types=1);

namespace App\Http\Requests\VehicleFeatures;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleFeatureRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:vehicle_features,slug'],
            'category' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
