<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => null,
            
            'invoice_number' => fake()->bothify('INV-####'),
            'subtotal' => fake()->randomFloat(2, 1000, 100000),
            'tax_total' => fake()->randomFloat(2, 0, 10000),
            'total' => fake()->randomFloat(2, 1000, 100000),
            'status' => fake()->randomElement(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
            'issued_at' => fake()->date(),
            'due_at' => fake()->date(),
        ];
    }

    /**
     * Indicate that the invoice is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'issued_at' => fake()->date(),
            'due_at' => fake()->date(),
        ]);
    }

    /**
     * Indicate that the invoice is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'overdue',
            'issued_at' => fake()->date(),
            'due_at' => fake()->date(),
        ]);
    }

    /**
     * Indicate that the invoice is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Indicate that the invoice is in draft status.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the invoice is sent.
     */
    public function sent(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sent',
            'issued_at' => fake()->date(),
            'due_at' => fake()->date(),
        ]);
    }
}
