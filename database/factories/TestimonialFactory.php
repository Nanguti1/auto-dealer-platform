<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = ['CEO', 'Manager', 'Director', 'Owner', 'Sales Manager', 'Customer Service Rep'];
        $testimonials = [
            'Excellent service and great selection of vehicles!',
            'The team was very helpful and professional.',
            'Best car buying experience I have ever had.',
            'Highly recommend this dealership to everyone.',
            'Fair prices and no pressure sales tactics.',
            'The financing process was smooth and easy.',
            'Great after-sales support and service.',
        ];

        return [
            'name' => fake()->name(),
            'position' => fake()->randomElement($positions),
            'avatar_path' => fake()->imageUrl(200, 200, 'people'),
            'rating' => fake()->numberBetween(4, 5),
            'body' => fake()->randomElement($testimonials),
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
