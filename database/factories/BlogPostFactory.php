<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogPostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'blog_category_id' => BlogCategory::factory(),
            'title' => fake()->sentence(),
            'slug' => fake()->slug(),
            'excerpt' => fake()->sentence(),
            'content' => fake()->paragraphs(5, true),
            'featured_image' => fake()->imageUrl(),
            'meta_title' => fake()->sentence(),
            'meta_description' => fake()->sentence(),
            'is_published' => fake()->boolean(),
            'published_at' => fake()->optional()->date(),
            'view_count' => fake()->numberBetween(0, 10000),
        ];
    }
}
