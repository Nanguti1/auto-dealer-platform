<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
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
            'valuation_id' => ['nullable', 'integer', 'exists:trade_in_valuations,id'],
            'created_by' => ['nullable', 'integer', 'exists:users,id'],
            'offer_amount' => ['required', 'numeric', 'min:0'],
            'valid_until' => ['required', 'date', 'after:now'],
            'status' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'terms' => ['nullable', 'array'],
        ];
    }
}
