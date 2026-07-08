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
            'blog_category_id' => BlogCategory::factory(),
            'author_id' => User::factory(),
            'title' => fake()->sentence(),
            'slug' => fake()->slug(),
            'excerpt' => fake()->sentence(),
            'body' => fake()->paragraphs(5, true),
            'featured_image_path' => fake()->imageUrl(),
            'status' => fake()->randomElement(['draft', 'published']),
            'published_at' => fake()->optional()->dateTime(),
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTime(),
        ]);
    }

    /**
     * Indicate that the blog post is in draft status.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}
