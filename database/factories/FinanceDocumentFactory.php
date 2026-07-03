<?php

namespace Database\Factories;

use App\Models\FinanceApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

class FinanceDocumentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'finance_application_id' => FinanceApplication::factory(),
            'name' => fake()->words(3, true),
            'path' => fake()->filePath(),
            'type' => fake()->randomElement(['id_proof', 'income_proof', 'employment_proof', 'bank_statement', 'tax_return', 'other']),
        ];
    }
}
