<?php

namespace Database\Factories;

use App\Models\HomePageSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<HomePageSection>
 */
class HomePageSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->slug(),
            'type' => fake()->randomElement(['featured_vehicles', 'featured_brands', 'featured_categories', 'statistics', 'cta_section']),
            'content' => ['brand_ids' => fake()->randomElements([1, 2, 3, 4, 5], fake()->numberBetween(1, 3))],
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
