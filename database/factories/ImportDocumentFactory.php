<?php

namespace Database\Factories;

use App\Models\VehicleImport;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImportDocumentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vehicle_import_id' => VehicleImport::factory(),
            'name' => fake()->words(3, true),
            'type' => fake()->randomElement(['bill_of_lading', 'commercial_invoice', 'packing_list', 'certificate_of_origin', 'insurance_certificate']),
            'path' => fake()->filePath(),
            'verified_at' => fake()->optional()->dateTime(),
        ];
    }
}
