<?php

declare(strict_types=1);

namespace App\Http\Requests\TradeIns;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInspectionRequest extends FormRequest
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
            'trade_in_request_id' => ['sometimes', 'nullable', 'integer', 'exists:trade_in_requests,id'],
            'inspector_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'inspection_date' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'nullable', 'string', 'max:255'],
            'condition_details' => ['sometimes', 'nullable', 'array'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'estimated_repair_cost' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'repair_recommendations' => ['sometimes', 'nullable', 'string'],
            'photos' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
