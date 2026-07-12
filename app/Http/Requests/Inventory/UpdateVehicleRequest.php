<?php

declare(strict_types=1);

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class UpdateVehicleRequest extends FormRequest
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
        $vehicle = $this->route('vehicle');

        return [
            'branch_id' => ['sometimes', 'nullable', 'integer', 'exists:branches,id'],
            'make_id' => ['sometimes', 'nullable', 'integer', 'exists:makes,id'],
            'model_id' => ['sometimes', 'nullable', 'integer', 'exists:models,id'],
            'stock_number' => ['sometimes', 'nullable', 'string', 'max:255'],
            'vin' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'integer', 'between:1900,2030'],
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:vehicles,slug,'.$vehicle->id],
            'sale_price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'cost_price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'msrp' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'mileage' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'description' => ['sometimes', 'nullable', 'string'],
            'features' => ['sometimes', 'nullable', 'array'],
            'features.*' => ['sometimes', 'nullable', 'integer', 'exists:vehicle_features,id'],
            'specifications' => ['sometimes', 'nullable', 'array'],
            'specifications.*.name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'specifications.*.value' => ['sometimes', 'nullable', 'string', 'max:255'],
            'metadata' => ['sometimes', 'nullable', 'array'],
            'is_featured' => ['sometimes', 'nullable', 'boolean'],
            'is_certified' => ['sometimes', 'nullable', 'boolean'],
            'acquired_at' => ['sometimes', 'nullable', 'date'],
            'listed_at' => ['sometimes', 'nullable', 'date'],
            'sold_at' => ['sometimes', 'nullable', 'date'],
            'vehicle_category_id' => ['sometimes', 'nullable', 'integer', 'exists:vehicle_categories,id'],
            'trim_level_id' => ['sometimes', 'nullable', 'integer', 'exists:trim_levels,id'],
            'body_type_id' => ['sometimes', 'nullable', 'integer', 'exists:body_types,id'],
            'fuel_type_id' => ['sometimes', 'nullable', 'integer', 'exists:fuel_types,id'],
            'transmission_type_id' => ['sometimes', 'nullable', 'integer', 'exists:transmission_types,id'],
            'drive_type_id' => ['sometimes', 'nullable', 'integer', 'exists:drive_types,id'],
            'engine_type_id' => ['sometimes', 'nullable', 'integer', 'exists:engine_types,id'],
            'color_id' => ['sometimes', 'nullable', 'integer', 'exists:colors,id'],
            'interior_color_id' => ['sometimes', 'nullable', 'integer', 'exists:interior_colors,id'],
            'vehicle_condition_id' => ['sometimes', 'nullable', 'integer', 'exists:vehicle_conditions,id'],
            'vehicle_status_id' => ['sometimes', 'nullable', 'integer', 'exists:vehicle_statuses,id'],
            'inventory_status_id' => ['sometimes', 'nullable', 'integer', 'exists:inventory_statuses,id'],
            'media' => ['sometimes', 'nullable', 'array'],
            'media.*' => ['sometimes', 'nullable', 'file', 'image', 'max:10240'],
            'save_as_draft' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
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

        // Handle media files - ensure they're always an array
        if ($this->hasFile('media')) {
            $mediaFiles = $this->file('media');
            if (! is_array($mediaFiles)) {
                $this->merge(['media' => [$mediaFiles]]);
            }
        } else {
            // Ensure media is always an array, even if no files are uploaded
            $this->merge(['media' => []]);
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
