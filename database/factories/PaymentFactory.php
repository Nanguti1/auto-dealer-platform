<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => null,
            'vehicle_reservation_id' => null,
            'amount' => fake()->randomFloat(2, 100, 50000),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'CAD']),
            'method' => fake()->randomElement(['credit_card', 'debit_card', 'bank_transfer', 'cash', 'check']),
            'status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'transaction_reference' => fake()->bothify('REF-########'),
            'paid_at' => fake()->optional()->dateTime(),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the payment is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'paid_at' => fake()->dateTime(),
        ]);
    }

    /**
     * Indicate that the payment is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the payment failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the payment is refunded.
     */
    public function refunded(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'refunded',
            'paid_at' => fake()->dateTime(),
        ]);
    }
}
