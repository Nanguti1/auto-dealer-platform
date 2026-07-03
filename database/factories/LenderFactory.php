<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LenderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'is_active' => true,
        ];
    }
}
