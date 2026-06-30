<?php

namespace Database\Factories;

use App\Models\Make;
use Illuminate\Database\Eloquent\Factories\Factory;

class ModelFactory extends Factory
{
    public function definition(): array
    {
        return [
            'make_id' => Make::factory(),
            'name' => fake()->word(),
            'slug' => fake()->slug(),
        ];
    }
}
