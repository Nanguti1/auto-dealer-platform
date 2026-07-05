<?php

declare(strict_types=1);

namespace App\Http\Requests\CRM;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
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
            'crm_stage_id' => ['nullable', 'integer', 'exists:crm_stages,id'],
            'assigned_user_id' => ['nullable', 'integer', 'exists:users,id'],
            'vehicle_id' => ['nullable', 'integer', 'exists:vehicles,id'],
            'source' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'budget' => ['nullable', 'numeric', 'min:0'],
            'last_contacted_at' => ['nullable', 'date'],
            'priority' => ['nullable', 'string', 'max:255'],
            'score' => ['nullable', 'integer'],
            'metadata' => ['nullable', 'array'],
            'metadata.vehicle_interest' => ['nullable', 'string'],
            'metadata.finance_interest' => ['nullable', 'string'],
            'metadata.trade_in_interest' => ['nullable', 'string'],
            'metadata.import_interest' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
