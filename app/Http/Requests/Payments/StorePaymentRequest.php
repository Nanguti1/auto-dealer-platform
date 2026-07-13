<?php

declare(strict_types=1);

namespace App\Http\Requests\Payments;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'vehicle_id' => ['sometimes', 'nullable', 'exists:vehicles,id'],
            'vehicle_reservation_id' => ['sometimes', 'nullable', 'exists:vehicle_reservations,id'],
            'invoice_id' => ['sometimes', 'nullable', 'exists:invoices,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'currency' => ['sometimes', 'nullable', 'string', 'max:3', 'in:USD,EUR,GBP,CAD'],
            'method' => ['required', 'string', 'in:credit_card,debit_card,bank_transfer,cash,check,financing,online'],
            'status' => ['sometimes', 'nullable', 'string', 'in:pending,completed,failed,refunded,cancelled'],
            'transaction_reference' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:payments,transaction_reference'],
            'paid_at' => ['sometimes', 'nullable', 'date'],
            'metadata' => ['sometimes', 'nullable', 'array'],
            'metadata.notes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
