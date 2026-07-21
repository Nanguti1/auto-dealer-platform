<?php

declare(strict_types=1);

namespace App\Http\Requests\Sales;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
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
            'customer_id' => ['sometimes', 'nullable', 'exists:customers,id'],
            'vehicle_id' => ['sometimes', 'nullable', 'exists:vehicles,id'],
            'payment_id' => ['sometimes', 'nullable', 'exists:payments,id'],
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'branch_id' => ['sometimes', 'nullable', 'exists:branches,id'],
            'invoice_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'subtotal' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'tax_total' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'total' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'issued_at' => ['sometimes', 'nullable', 'date'],
            'due_at' => ['sometimes', 'nullable', 'date', 'after:issued_at'],
            'status' => ['sometimes', 'nullable', 'string', 'in:draft,sent,paid,overdue,cancelled'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->filled('subtotal') && $this->filled('tax_total') && $this->filled('total')) {
                $calculatedTotal = $this->subtotal + $this->tax_total;
                if (abs($this->total - $calculatedTotal) > 0.01) {
                    $validator->errors()->add('total', 'Total must equal subtotal plus tax total.');
                }
            }
        });
    }
}
