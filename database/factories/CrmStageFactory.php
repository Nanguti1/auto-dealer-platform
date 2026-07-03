<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CrmStageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'slug' => fake()->slug(),
            'sort_order' => fake()->numberBetween(0, 100),
            'is_won' => fake()->boolean(),
            'is_lost' => fake()->boolean(),
        ];
    }
}
