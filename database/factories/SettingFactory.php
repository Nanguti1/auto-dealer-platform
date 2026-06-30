<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'group' => fake()->word(),
            'key' => fake()->word(),
            'value' => fake()->word(),
            'type' => fake()->randomElement(['string', 'integer', 'boolean', 'json']),
            'is_public' => fake()->boolean(),
        ];
    }
}
