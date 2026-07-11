<?php

declare(strict_types=1);

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class StoreVehicleRequest extends FormRequest
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
            'slug' => ['nullable', 'string', 'max:255', 'unique:vehicles,slug'],
            'sale_price' => ['required', 'numeric', 'min:0'],
            'features' => ['sometimes', 'nullable', 'array'],
            'features.*' => ['sometimes', 'nullable', 'integer', 'exists:vehicle_features,id'],
            'specifications' => ['sometimes', 'nullable', 'array'],
            'specifications.*.name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'specifications.*.value' => ['sometimes', 'nullable', 'string', 'max:255'],
            'metadata' => ['sometimes', 'nullable', 'array'],
            'media' => ['sometimes', 'nullable', 'array'],
            'media.*' => ['sometimes', 'nullable', 'file', 'image', 'max:10240'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert comma-separated features string to array
        if ($this->has('features') && is_string($this->input('features'))) {
            $features = array_filter(array_map('trim', explode(',', $this->input('features'))));
            // Reindex array to ensure sequential keys for validation
            $features = array_values($features);
            $this->merge(['features' => $features]);
        }

        // Ensure array fields are arrays
        $arrayFields = ['features', 'specifications', 'metadata'];
        foreach ($arrayFields as $field) {
            if ($this->has($field) && ! is_array($this->input($field))) {
                $this->merge([$field => []]);
            }
            // Reindex array fields to ensure sequential keys for validation
            if ($this->has($field) && is_array($this->input($field))) {
                $this->merge([$field => array_values($this->input($field))]);
            }
        }
    }

    /**
     * Get the media files from the request.
     *
     * @return array<int, UploadedFile>
     */
    public function getMediaFiles(): array
    {
        return array_filter($this->file('media', []), fn ($file) => $file instanceof UploadedFile);
    }
}
