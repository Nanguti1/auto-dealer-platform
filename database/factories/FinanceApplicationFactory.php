<?php

namespace Database\Factories;

use App\Models\Lender;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class FinanceApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'lender_id' => Lender::factory(),
            'application_number' => fake()->bothify('FIN-####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'income' => fake()->randomFloat(2, 30000, 200000),
            'employment_status' => fake()->randomElement(['employed', 'self-employed', 'unemployed', 'retired']),
            'requested_amount' => fake()->randomFloat(2, 10000, 100000),
            'term_months' => fake()->numberBetween(12, 84),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'funded']),
            'credit_score' => fake()->numberBetween(300, 850),
            'notes' => fake()->paragraph(),
        ];
    }
}
