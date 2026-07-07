<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VehicleComparison;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleComparison>
 */
class VehicleComparisonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'session_id' => fake()->uuid(),
        ];
    }
}
