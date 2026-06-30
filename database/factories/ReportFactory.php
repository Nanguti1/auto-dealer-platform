<?php

namespace Database\Factories;

use App\Models\Report;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'type' => fake()->randomElement(['sales', 'inventory', 'lead', 'finance']),
            'configuration' => [
                'date_range' => [
                    'start' => fake()->date(),
                    'end' => fake()->date(),
                ],
                'filters' => [],
            ],
            'user_id' => null,
            'is_favorite' => fake()->boolean(20),
            'scheduled_at' => fake()->optional(0.3)->dateTimeBetween('now', '+1 month'),
        ];
    }
}
