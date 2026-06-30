<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LenderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'slug' => fake()->slug(),
            'contact_person' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'interest_rate' => fake()->randomFloat(2, 2, 15),
            'min_loan_amount' => fake()->randomFloat(2, 5000, 10000),
            'max_loan_amount' => fake()->randomFloat(2, 50000, 200000),
            'is_active' => true,
        ];
    }
}
