<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SupplierFactory extends Factory
{
    public function definition(): array
    {
        return [
            'company_name' => fake()->company(),
            'supplier_code' => fake()->unique()->regexify('SUP-[A-Z0-9]{6}'),
            'contact_person' => fake()->name(),
            'supplier_type' => fake()->randomElement(['vehicle_dealer', 'vehicle_manufacturer', 'spare_parts_supplier', 'accessories_supplier', 'auction_house', 'individual', 'other']),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'alternative_phone' => fake()->optional()->phoneNumber(),
            'website' => fake()->optional()->url(),
            'country' => fake()->country(),
            'county' => fake()->state(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'physical_address' => fake()->address(),
            'tax_pin' => fake()->optional()->regexify('[A-Z0-9]{10,20}'),
            'registration_number' => fake()->optional()->regexify('[A-Z0-9]{8,15}'),
            'payment_terms' => fake()->optional()->randomElement(['Net 30', 'Net 60', 'Net 90', 'COD', 'Immediate']),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
            'credit_limit' => fake()->randomFloat(2, 0, 1000000),
            'status' => fake()->randomElement(['active', 'inactive', 'blacklisted']),
            'notes' => fake()->optional()->text(),
        ];
    }
}
