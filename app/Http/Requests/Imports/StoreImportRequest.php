<?php

declare(strict_types=1);

namespace App\Http\Requests\Imports;

use Illuminate\Foundation\Http\FormRequest;

class StoreImportRequest extends FormRequest
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
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'reference_number' => ['required', 'string', 'max:255', 'unique:vehicle_imports,reference_number'],
            'origin_country' => ['required', 'string', 'max:255'],
            'destination_port' => ['required', 'string', 'max:255'],
            'estimated_cost' => ['required', 'numeric', 'min:0'],
            'status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'vehicle_id' => ['sometimes', 'nullable', 'exists:vehicles,id'],
            'request_data' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
