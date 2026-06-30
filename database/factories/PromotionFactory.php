<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromotionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->sentence(),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'discount_type' => fake()->randomElement(['percentage', 'fixed']),
            'discount_value' => fake()->randomFloat(2, 0, 100),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'is_active' => fake()->boolean(),
            'min_purchase_amount' => fake()->randomFloat(2, 0, 1000),
            'max_discount_amount' => fake()->randomFloat(2, 0, 5000),
            'usage_limit' => fake()->numberBetween(0, 1000),
            'used_count' => fake()->numberBetween(0, 500),
        ];
    }
}
