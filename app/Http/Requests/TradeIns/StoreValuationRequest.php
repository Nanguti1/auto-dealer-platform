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
            'trade_in_request_id' => ['required', 'integer', 'exists:trade_in_requests,id'],
            'valuation_source_id' => ['nullable', 'integer', 'exists:users,id'],
            'trade_in_value' => ['required', 'numeric', 'min:0'],
            'wholesale_value' => ['nullable', 'numeric', 'min:0'],
            'retail_value' => ['nullable', 'numeric', 'min:0'],
            'valuation_method' => ['nullable', 'string', 'max:255'],
            'market_comparables' => ['nullable', 'array'],
            'adjustments' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
