<?php

declare(strict_types=1);

namespace App\Http\Requests\Imports;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImportRequest extends FormRequest
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
        $vehicleImport = $this->route('vehicleImport');
        $ignoreId = $vehicleImport ? $vehicleImport->id : null;

        return [
            'supplier_id' => ['sometimes', 'nullable', 'exists:suppliers,id'],
            'reference_number' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:vehicle_imports,reference_number,'.$ignoreId],
            'origin_country' => ['sometimes', 'nullable', 'string', 'max:255'],
            'destination_port' => ['sometimes', 'nullable', 'string', 'max:255'],
            'port_of_loading' => ['sometimes', 'nullable', 'string', 'max:255'],
            'shipping_method' => ['sometimes', 'nullable', 'string', 'max:255'],
            'estimated_cost' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'insurance_value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'vehicle_id' => ['sometimes', 'nullable', 'exists:vehicles,id'],
            'customer_id' => ['sometimes', 'nullable', 'exists:customers,id'],
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'special_instructions' => ['sometimes', 'nullable', 'string'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'request_data' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
