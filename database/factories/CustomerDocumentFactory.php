<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\CustomerDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CustomerDocument>
 */
class CustomerDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $documentTypes = ['ID', 'License', 'Proof of Income', 'Proof of Address', 'Insurance', 'Bank Statement', 'Tax Return'];
        $extensions = ['pdf', 'jpg', 'png', 'jpeg'];

        return [
            'branch_id' => Branch::factory(),
            'customer_id' => Customer::factory(),
            'name' => fake()->randomElement($documentTypes).' Document',
            'path' => fake()->filePath().'.'.fake()->randomElement($extensions),
            'type' => fake()->randomElement($documentTypes),
        ];
    }
}
