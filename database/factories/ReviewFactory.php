<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Review;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'approved', 'rejected'];

        return [
            'branch_id' => Branch::factory(),
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'rating' => fake()->numberBetween(1, 5),
            'title' => fake()->sentence(),
            'body' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement($statuses),
            'approved_at' => fake()->optional(50)->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
