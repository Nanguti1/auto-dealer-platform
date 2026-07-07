<?php

namespace Database\Factories;

use App\Models\BlogTag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BlogTag>
 */
class BlogTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6366F1'];
        $tags = [
            'Buying Guide', 'Maintenance Tips', 'Industry News', 'Vehicle Reviews',
            'Finance', 'Insurance', 'Technology', 'Safety', 'Electric Vehicles',
            'Hybrid Cars', 'Luxury', 'Family Cars', 'Performance', 'Off-Road',
        ];

        return [
            'name' => fake()->randomElement($tags),
            'slug' => fake()->slug(),
            'color' => fake()->randomElement($colors),
            'usage_count' => fake()->numberBetween(0, 100),
        ];
    }
}
