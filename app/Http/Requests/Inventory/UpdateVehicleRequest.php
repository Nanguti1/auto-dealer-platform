<?php

declare(strict_types=1);

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
        $vehicle = $this->route('vehicle');

        return [
            'branch_id' => ['sometimes', 'nullable', 'integer', 'exists:branches,id'],
            'make_id' => ['sometimes', 'nullable', 'integer', 'exists:makes,id'],
            'model_id' => ['sometimes', 'nullable', 'integer', 'exists:models,id'],
            'stock_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'vin' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'integer', 'between:1900,2030'],
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:vehicles,slug,'.$vehicle],
            'sale_price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
        ];
    }
}
