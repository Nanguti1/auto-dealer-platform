<?php

declare(strict_types=1);

namespace App\Http\Requests\Sales;

use App\Models\Payment;
use Illuminate\Foundation\Http\FormRequest;

class StoreReceiptRequest extends FormRequest
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
            'payment_id' => ['required', 'exists:payments,id'],
            'invoice_id' => ['sometimes', 'nullable', 'exists:invoices,id'],
            'user_id' => ['required', 'exists:users,id'],
            'receipt_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'payment_method' => ['sometimes', 'nullable', 'string', 'in:credit_card,debit_card,bank_transfer,cash,check'],
            'status' => ['sometimes', 'nullable', 'string', 'in:issued,void'],
            'notes' => ['sometimes', 'nullable', 'string'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->filled('payment_id') && $this->filled('amount')) {
                $payment = Payment::find($this->payment_id);
                if ($payment && $this->amount > $payment->amount) {
                    $validator->errors()->add('amount', 'Receipt amount cannot exceed original payment amount.');
                }
            }
        });
    }
}
