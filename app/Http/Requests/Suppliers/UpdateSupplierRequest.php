<?php

declare(strict_types=1);

namespace App\Http\Requests\Suppliers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierRequest extends FormRequest
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
        $supplierId = $this->route('supplier')?->id;

        return [
            'branch_id' => ['nullable', 'integer', 'exists:branches,id'],
            'company_name' => ['required', 'string', 'max:255'],
            'supplier_code' => ['nullable', 'string', 'max:50', 'unique:suppliers,supplier_code,'.$supplierId],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'supplier_type' => ['required', 'in:vehicle_dealer,vehicle_manufacturer,spare_parts_supplier,accessories_supplier,auction_house,individual,other'],
            'email' => ['nullable', 'email', 'max:255', 'unique:suppliers,email,'.$supplierId],
            'phone' => ['nullable', 'string', 'max:50'],
            'alternative_phone' => ['nullable', 'string', 'max:50'],
            'website' => ['nullable', 'url', 'max:255'],
            'country' => ['nullable', 'string', 'max:100'],
            'county' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'physical_address' => ['nullable', 'string', 'max:500'],
            'tax_pin' => ['nullable', 'string', 'max:50'],
            'registration_number' => ['nullable', 'string', 'max:50'],
            'payment_terms' => ['nullable', 'string', 'max:100'],
            'currency' => ['nullable', 'string', 'max:3'],
            'credit_limit' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'in:active,inactive,blacklisted'],
            'notes' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
