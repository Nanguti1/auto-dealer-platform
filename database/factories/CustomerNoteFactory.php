<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\CustomerNote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CustomerNote>
 */
class CustomerNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'branch_id' => Branch::factory(),
            'customer_id' => Customer::factory(),
            'user_id' => User::factory(),
            'body' => fake()->paragraphs(3, true),
            'is_private' => fake()->boolean(30),
        ];
    }
}
