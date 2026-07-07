<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\VehicleFeature;
use App\Models\VehicleFeatureMapping;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleFeatureMapping>
 */
class VehicleFeatureMappingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_id' => Vehicle::factory(),
            'vehicle_feature_id' => VehicleFeature::factory(),
        ];
    }
}
