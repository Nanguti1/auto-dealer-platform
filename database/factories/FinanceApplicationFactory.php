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
            'requested_amount' => fake()->randomFloat(2, 10000, 100000),
            'down_payment' => fake()->randomFloat(2, 1000, 20000),
            'term_months' => fake()->numberBetween(12, 84),
            'interest_rate' => fake()->randomFloat(2, 2.5, 15.0),
            'estimated_monthly_payment' => fake()->randomFloat(2, 200, 2000),
            'status' => fake()->randomElement(['submitted', 'under_review', 'approved', 'rejected', 'funded']),
            'applicant_data' => [
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => fake()->email(),
                'phone' => fake()->phoneNumber(),
                'income' => fake()->randomFloat(2, 30000, 200000),
                'employment_status' => fake()->randomElement(['employed', 'self-employed', 'unemployed', 'retired']),
                'credit_score' => fake()->numberBetween(300, 850),
            ],
        ];
    }
}
