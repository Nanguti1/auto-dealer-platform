<?php

declare(strict_types=1);

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDashboardWidgetRequest extends FormRequest
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
            'branch_id' => ['required', 'integer', 'exists:branches,id'],
            'make_id' => ['required', 'integer', 'exists:makes,id'],
            'model_id' => ['required', 'integer', 'exists:models,id'],
            'stock_number' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'between:1900,2030'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'sale_price' => ['required', 'numeric', 'min:0'],
        ];
    }
}
