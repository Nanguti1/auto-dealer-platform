<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfferRequest extends FormRequest
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
            'trade_in_request_id' => ['sometimes', 'nullable', 'exists:trade_in_requests,id'],
            'valuation_id' => ['sometimes', 'nullable', 'exists:trade_in_valuations,id'],
            'created_by' => ['sometimes', 'nullable', 'exists:users,id'],
            'offer_amount' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'valid_until' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'terms' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
