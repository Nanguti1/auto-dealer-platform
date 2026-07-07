<?php

namespace Database\Factories;

use App\Models\CrmFollowUp;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CrmFollowUp>
 */
class CrmFollowUpFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['Phone Call', 'Email', 'Text Message', 'In-Person', 'Video Call'];
        $statuses = ['pending', 'completed', 'cancelled', 'rescheduled'];

        return [
            'lead_id' => Lead::factory(),
            'assigned_user_id' => User::factory(),
            'type' => fake()->randomElement($types),
            'due_at' => fake()->dateTimeBetween('now', '+30 days'),
            'completed_at' => fake()->optional(70)->dateTimeBetween('-30 days', 'now'),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
