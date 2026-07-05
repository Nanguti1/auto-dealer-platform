<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class StoreInspectionRequest extends FormRequest
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
            'inspector_id' => ['nullable', 'integer', 'exists:users,id'],
            'inspection_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'max:255'],
            'condition_details' => ['nullable', 'array'],
            'notes' => ['nullable', 'string'],
            'estimated_repair_cost' => ['nullable', 'numeric', 'min:0'],
            'repair_recommendations' => ['nullable', 'string'],
            'photos' => ['nullable', 'array'],
        ];
    }
}
