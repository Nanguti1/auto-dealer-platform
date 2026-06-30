<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class StoreValuationRequest extends FormRequest
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
            'trade_in_request_id' => ['required', 'exists:trade_in_requests,id'],
            'valuation_source_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'trade_in_value' => ['required', 'numeric', 'min:0'],
            'wholesale_value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'retail_value' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'valuation_method' => ['sometimes', 'nullable', 'string', 'max:100'],
            'market_comparables' => ['sometimes', 'nullable', 'array'],
            'adjustments' => ['sometimes', 'nullable', 'string'],
            'notes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
