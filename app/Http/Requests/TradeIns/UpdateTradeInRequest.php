<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTradeInRequest extends FormRequest
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
            'user_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'vehicle_id' => ['sometimes', 'nullable', 'integer', 'exists:vehicles,id'],
            'make' => ['sometimes', 'nullable', 'string', 'max:255'],
            'model' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'integer', 'min:1900', 'max:'.(date('Y') + 1)],
            'vin' => ['sometimes', 'nullable', 'string', 'max:255'],
            'mileage' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'estimated_value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'offered_value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'nullable', 'string', 'max:255'],
            'condition_report' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
