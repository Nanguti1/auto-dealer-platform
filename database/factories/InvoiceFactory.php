<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'customer_id' => Customer::factory(),
            'invoice_number' => fake()->bothify('INV-####'),
            'subtotal' => fake()->randomFloat(2, 1000, 100000),
            'tax_amount' => fake()->randomFloat(2, 0, 10000),
            'discount_amount' => fake()->randomFloat(2, 0, 5000),
            'total_amount' => fake()->randomFloat(2, 1000, 100000),
            'status' => fake()->randomElement(['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled']),
            'due_date' => fake()->date(),
            'paid_date' => fake()->optional()->date(),
            'notes' => fake()->paragraph(),
        ];
    }
}
