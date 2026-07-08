<?php

namespace Database\Factories;

use App\Models\CrmStage;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'crm_stage_id' => CrmStage::factory(),
            'assigned_user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'source' => fake()->randomElement(['website', 'phone', 'email', 'referral', 'advertisement']),
            'status' => fake()->randomElement(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'budget' => fake()->randomFloat(2, 10000, 100000),
            'last_contacted_at' => fake()->dateTime(),
        ];
    }

    /**
     * Indicate that the lead is assigned to a user.
     */
    public function assigned(): static
    {
        return $this->state(fn (array $attributes) => [
            'assigned_user_id' => User::factory(),
        ]);
    }

    /**
     * Indicate that the lead is converted (won).
     */
    public function converted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'won',
            'last_contacted_at' => fake()->dateTime(),
        ]);
    }

    /**
     * Indicate that the lead is new (status: new).
     */
    public function statusNew(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'new',
        ]);
    }

    /**
     * Indicate that the lead is lost.
     */
    public function lost(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'lost',
        ]);
    }
}
