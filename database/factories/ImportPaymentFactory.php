<?php

namespace Database\Factories;

use App\Models\VehicleImport;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImportPaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vehicle_import_id' => VehicleImport::factory(),
            'payment_id' => null,
            'payment_reference' => fake()->bothify('PAY-########'),
            'amount' => fake()->randomFloat(2, 1000, 100000),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'JPY']),
            'payment_type' => fake()->randomElement(['deposit', 'balance', 'full_payment', 'customs_fee', 'shipping_fee']),
            'status' => fake()->randomElement(['pending', 'paid', 'overdue', 'cancelled']),
            'due_date' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'paid_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
            'notes' => fake()->optional()->sentence(),
            'metadata' => [],
        ];
    }
}
