<?php

declare(strict_types=1);

namespace App\Http\Requests\Imports;

use Illuminate\Foundation\Http\FormRequest;

class StoreShipmentRequest extends FormRequest
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
            'vehicle_import_id' => ['required', 'exists:vehicle_imports,id'],
            'tracking_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'carrier' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'current_location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'estimated_arrival' => ['sometimes', 'nullable', 'date'],
            'actual_arrival' => ['sometimes', 'nullable', 'date'],
            'origin' => ['sometimes', 'nullable', 'string', 'max:255'],
            'destination' => ['sometimes', 'nullable', 'string', 'max:255'],
            'metadata' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
