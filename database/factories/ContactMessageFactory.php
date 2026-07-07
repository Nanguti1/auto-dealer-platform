<?php

namespace Database\Factories;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactMessage>
 */
class ContactMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Vehicle Inquiry', 'Test Drive Request', 'Financing Information',
            'General Question', 'Service Appointment', 'Trade-In Inquiry',
        ];
        $statuses = ['pending', 'responded', 'archived'];

        return [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'subject' => fake()->randomElement($subjects),
            'message' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement($statuses),
            'responded_at' => fake()->optional(40)->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
