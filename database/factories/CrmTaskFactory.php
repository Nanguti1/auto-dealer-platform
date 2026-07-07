<?php

namespace Database\Factories;

use App\Models\CrmTask;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CrmTask>
 */
class CrmTaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $statuses = ['pending', 'in_progress', 'completed', 'cancelled'];

        return [
            'lead_id' => Lead::factory(),
            'assigned_user_id' => User::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->optional()->paragraph(),
            'due_at' => fake()->dateTimeBetween('now', '+30 days'),
            'completed_at' => fake()->optional(60)->dateTimeBetween('-30 days', 'now'),
            'priority' => fake()->randomElement($priorities),
            'status' => fake()->randomElement($statuses),
        ];
    }
}
