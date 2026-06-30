<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class TradeInRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'vin' => fake()->bothify('####################'),
            'year' => fake()->numberBetween(2010, 2024),
            'make' => fake()->company(),
            'model' => fake()->word(),
            'mileage' => fake()->numberBetween(0, 200000),
            'condition' => fake()->randomElement(['excellent', 'good', 'fair', 'poor']),
            'status' => fake()->randomElement(['pending', 'reviewed', 'accepted', 'rejected']),
            'notes' => fake()->paragraph(),
        ];
    }
}
