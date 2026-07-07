<?php

namespace Database\Factories;

use App\Models\ComparisonItem;
use App\Models\Vehicle;
use App\Models\VehicleComparison;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ComparisonItem>
 */
class ComparisonItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_comparison_id' => VehicleComparison::factory(),
            'vehicle_id' => Vehicle::factory(),
        ];
    }
}
