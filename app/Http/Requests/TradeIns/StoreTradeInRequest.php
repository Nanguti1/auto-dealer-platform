<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class StoreTradeInRequest extends FormRequest
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
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'vehicle_id' => ['nullable', 'integer', 'exists:vehicles,id'],
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1900', 'max:'.(date('Y') + 1)],
            'vin' => ['nullable', 'string', 'max:255'],
            'mileage' => ['nullable', 'integer', 'min:0'],
            'estimated_value' => ['nullable', 'numeric', 'min:0'],
            'offered_value' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'max:255'],
            'condition_report' => ['nullable'], // Accept both string and array, will be converted in controller
        ];
    }
}
