<?php

namespace Database\Factories;

use App\Models\TradeInInspection;
use App\Models\TradeInRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TradeInInspection>
 */
class TradeInInspectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['scheduled', 'in_progress', 'completed', 'failed', 'cancelled'];
        $conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

        return [
            'trade_in_request_id' => TradeInRequest::factory(),
            'inspector_id' => User::factory(),
            'inspection_date' => fake()->dateBetween('-30 days', '+30 days'),
            'status' => fake()->randomElement($statuses),
            'condition_details' => [
                'exterior' => fake()->randomElement($conditions),
                'interior' => fake()->randomElement($conditions),
                'mechanical' => fake()->randomElement($conditions),
                'tires' => fake()->randomElement($conditions),
                'mileage' => fake()->numberBetween(10000, 150000),
            ],
            'notes' => fake()->optional()->paragraph(),
            'estimated_repair_cost' => fake()->optional(60)->randomFloat(2, 0, 5000),
            'repair_recommendations' => fake()->optional()->paragraphs(2, true),
            'photos' => fake()->optional(40)->randomElements([
                fake()->imageUrl(800, 600, 'cars'),
                fake()->imageUrl(800, 600, 'cars'),
                fake()->imageUrl(800, 600, 'cars'),
            ], fake()->numberBetween(1, 3)),
        ];
    }
}
