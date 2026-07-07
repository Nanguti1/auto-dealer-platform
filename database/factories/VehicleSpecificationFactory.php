<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Vehicle;
use App\Models\VehicleSpecification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleSpecification>
 */
class VehicleSpecificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $groups = ['Engine', 'Transmission', 'Dimensions', 'Performance', 'Fuel Economy', 'Safety', 'Comfort', 'Technology'];
        $specifications = [
            ['name' => 'Horsepower', 'value' => fake()->numberBetween(100, 500), 'unit' => 'hp'],
            ['name' => 'Torque', 'value' => fake()->numberBetween(150, 500), 'unit' => 'lb-ft'],
            ['name' => 'Displacement', 'value' => fake()->randomFloat(1, 1.5, 6.0), 'unit' => 'L'],
            ['name' => 'Cylinders', 'value' => fake()->numberBetween(4, 8), 'unit' => ''],
            ['name' => 'Length', 'value' => fake()->numberBetween(4000, 5500), 'unit' => 'mm'],
            ['name' => 'Width', 'value' => fake()->numberBetween(1800, 2100), 'unit' => 'mm'],
            ['name' => 'Height', 'value' => fake()->numberBetween(1400, 1800), 'unit' => 'mm'],
            ['name' => 'Wheelbase', 'value' => fake()->numberBetween(2500, 3200), 'unit' => 'mm'],
            ['name' => '0-60 mph', 'value' => fake()->randomFloat(1, 3.5, 8.0), 'unit' => 's'],
            ['name' => 'Top Speed', 'value' => fake()->numberBetween(120, 200), 'unit' => 'mph'],
            ['name' => 'MPG City', 'value' => fake()->numberBetween(15, 35), 'unit' => 'mpg'],
            ['name' => 'MPG Highway', 'value' => fake()->numberBetween(20, 45), 'unit' => 'mpg'],
            ['name' => 'Fuel Tank', 'value' => fake()->numberBetween(12, 20), 'unit' => 'gal'],
            ['name' => 'Curb Weight', 'value' => fake()->numberBetween(2500, 5000), 'unit' => 'lbs'],
        ];

        $spec = fake()->randomElement($specifications);

        return [
            'branch_id' => Branch::factory(),
            'vehicle_id' => Vehicle::factory(),
            'group' => fake()->randomElement($groups),
            'name' => $spec['name'],
            'value' => $spec['value'],
            'unit' => $spec['unit'],
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
