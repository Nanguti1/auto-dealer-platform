<?php

namespace Database\Factories;

use App\Models\Faq;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['General', 'Financing', 'Vehicle Information', 'Trade-Ins', 'Service', 'Insurance'];
        $questions = [
            'What is your return policy?',
            'Do you offer financing?',
            'Can I trade in my current vehicle?',
            'What documents do I need to purchase?',
            'Do you offer warranties?',
            'How do I schedule a test drive?',
            'What are your service hours?',
            'Do you ship vehicles?',
        ];

        return [
            'question' => fake()->randomElement($questions),
            'answer' => fake()->paragraphs(3, true),
            'category' => fake()->randomElement($categories),
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
