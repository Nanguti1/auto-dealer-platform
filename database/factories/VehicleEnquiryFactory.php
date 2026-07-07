<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleEnquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleEnquiry>
 */
class VehicleEnquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'responded', 'closed', 'archived'];

        return [
            'branch_id' => Branch::factory(),
            'vehicle_id' => Vehicle::factory(),
            'assigned_user_id' => fake()->boolean(70) ? User::factory() : null,
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'message' => fake()->paragraphs(2, true),
            'status' => fake()->randomElement($statuses),
            'responded_at' => fake()->optional(40)->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
