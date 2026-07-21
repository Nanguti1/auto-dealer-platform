<?php

declare(strict_types=1);

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('user')?->id ?? $this->route('id');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$userId],
            'phone' => ['nullable', 'string', 'max:50'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role_id' => ['nullable', 'exists:roles,id'],
            'branch_id' => ['nullable', 'exists:branches,id'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'array'],
            'preferences' => ['nullable', 'array'],
        ];
    }
}
