<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'invoice_id' => Invoice::factory(),
            'payment_number' => fake()->bothify('PAY-####'),
            'amount' => fake()->randomFloat(2, 100, 50000),
            'payment_method' => fake()->randomElement(['cash', 'credit_card', 'bank_transfer', 'check', 'financing']),
            'status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'payment_date' => fake()->date(),
            'reference_number' => fake()->bothify('REF-########'),
            'notes' => fake()->paragraph(),
        ];
    }
}
