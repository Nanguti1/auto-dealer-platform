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
}
