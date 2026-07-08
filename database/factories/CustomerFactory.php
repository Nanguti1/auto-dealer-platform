<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => null,
            'customer_number' => fake()->bothify('CUST-####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'date_of_birth' => fake()->date(),
            'preferences' => [],
        ];
    }

    /**
     * Indicate that the customer has an associated user account.
     */
    public function withUser(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => User::factory(),
        ]);
    }

    /**
     * Indicate that the customer is verified (has valid contact info).
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
        ]);
    }
}
