<?php

declare(strict_types=1);

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'customer_number' => ['nullable', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'date_of_birth' => ['nullable', 'date'],
            'preferences' => ['nullable', 'array'],
            'preferences.preferred_contact_method' => ['nullable', 'string', 'max:255'],
            'preferences.vehicle_interest' => ['nullable', 'string', 'max:255'],
            'preferences.email_marketing' => ['nullable', 'boolean'],
            'preferences.sms_updates' => ['nullable', 'boolean'],
            'preferences.lifecycle_stage' => ['nullable', 'string', 'max:255'],
        ];
    }
}
