<?php

declare(strict_types=1);

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFinanceApplicationRequest extends FormRequest
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
        $financeApplication = $this->route('financeApplication');
        $ignoreId = $financeApplication ? $financeApplication->id : null;

        return [
            'vehicle_id' => ['sometimes', 'nullable', 'exists:vehicles,id'],
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'lender_id' => ['sometimes', 'nullable', 'exists:lenders,id'],
            'requested_amount' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'down_payment' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'term_months' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:120'],
            'interest_rate' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:100'],
            'estimated_monthly_payment' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'nullable', 'string', 'in:submitted,under_review,approved,rejected,funded'],
            'applicant_data' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
