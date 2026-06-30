<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DynamicCmsPageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(3),
            'slug' => fake()->slug(),
            'content' => fake()->paragraphs(3, true),
            'meta_title' => fake()->sentence(),
            'meta_description' => fake()->sentence(),
            'is_published' => fake()->boolean(),
            'published_at' => fake()->optional()->date(),
        ];
    }
}
