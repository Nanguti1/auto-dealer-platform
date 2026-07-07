<?php

namespace Database\Factories;

use App\Models\ImportVehicleMapping;
use App\Models\Vehicle;
use App\Models\VehicleImport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ImportVehicleMapping>
 */
class ImportVehicleMappingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_import_id' => VehicleImport::factory(),
            'vehicle_id' => Vehicle::factory(),
        ];
    }
}
