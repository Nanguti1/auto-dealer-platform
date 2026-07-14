<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DynamicCmsPageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'slug' => fake()->slug(),
            'body' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'is_visible' => fake()->boolean(),
            'meta_title' => fake()->sentence(),
            'meta_description' => fake()->sentence(),
            'published_at' => fake()->optional()->dateTime(),
        ];
    }
}
