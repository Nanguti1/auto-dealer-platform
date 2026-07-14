<?php

declare(strict_types=1);

namespace App\Http\Requests\Sales;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReceiptRequest extends FormRequest
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
            'payment_id' => ['sometimes', 'nullable', 'exists:payments,id'],
            'invoice_id' => ['sometimes', 'nullable', 'exists:invoices,id'],
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'receipt_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'amount' => ['sometimes', 'nullable', 'numeric', 'min:0.01'],
            'status' => ['sometimes', 'nullable', 'string', 'in:issued,void'],
            'notes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
