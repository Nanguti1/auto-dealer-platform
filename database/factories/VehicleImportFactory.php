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
            'import_number' => fake()->bothify('IMP-####'),
            'vehicle_count' => fake()->numberBetween(1, 50),
            'total_cost' => fake()->randomFloat(2, 50000, 500000),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'JPY']),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'arrived', 'completed', 'cancelled']),
            'estimated_arrival' => fake()->date(),
            'actual_arrival' => fake()->optional()->date(),
            'notes' => fake()->paragraph(),
        ];
    }
}
