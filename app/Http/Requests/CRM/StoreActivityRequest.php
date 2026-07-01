<?php

declare(strict_types=1);

namespace App\Http\Requests\CRM;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
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
            'lead_id' => ['nullable', 'exists:leads,id'],
            'assigned_user_id' => ['nullable', 'exists:users,id'],
            'type' => ['required', 'string', 'max:255'],
            'due_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'in:pending,in_progress,completed,cancelled'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
