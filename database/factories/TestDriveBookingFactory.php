<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\TestDriveBooking;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TestDriveBooking>
 */
class TestDriveBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];

        return [
            'branch_id' => Branch::factory(),
            'vehicle_id' => Vehicle::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'assigned_user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'scheduled_at' => fake()->dateTimeBetween('now', '+30 days'),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
