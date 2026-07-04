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
            'make' => fake()->company(),
            'model' => fake()->word(),
            'year' => fake()->numberBetween(2010, 2024),
            'vin' => fake()->bothify('####################'),
            'mileage' => fake()->numberBetween(0, 200000),
            'estimated_value' => fake()->randomFloat(2, 5000, 50000),
            'offered_value' => fake()->randomFloat(2, 4000, 45000),
            'status' => fake()->randomElement(['pending', 'under_review', 'inspection_scheduled', 'inspection_completed', 'offer_pending', 'offer_accepted', 'offer_rejected', 'approved', 'rejected', 'completed', 'cancelled']),
            'condition_report' => [],
        ];
    }
}
