<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BodyTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'slug' => fake()->slug(),
            'code' => fake()->bothify('???'),
            'description' => fake()->sentence(),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
