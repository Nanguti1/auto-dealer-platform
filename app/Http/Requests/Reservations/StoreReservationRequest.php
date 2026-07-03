<?php

declare(strict_types=1);

namespace App\Http\Requests\Reservations;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'user_id' => ['required', 'exists:users,id'],
            'deposit_amount' => ['required', 'numeric', 'min:0'],
            'status' => ['sometimes', 'nullable', 'string', 'in:pending,confirmed,expired,cancelled,converted'],
            'expires_at' => ['sometimes', 'nullable', 'date', 'after:now'],
        ];
    }
}
