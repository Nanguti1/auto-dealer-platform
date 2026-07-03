<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleImportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'supplier_id' => Supplier::factory(),
            'vehicle_id' => null,
            'reference_number' => fake()->bothify('IMP-####'),
            'origin_country' => fake()->country(),
            'destination_port' => fake()->city(),
            'estimated_cost' => fake()->randomFloat(2, 50000, 500000),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'arrived', 'completed', 'cancelled']),
            'request_data' => [],
        ];
    }
}
