<?php

namespace Database\Factories;

use App\Models\VehicleImport;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImportShipmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vehicle_import_id' => VehicleImport::factory(),
            'tracking_number' => fake()->bothify('TRK-########'),
            'carrier' => fake()->randomElement(['DHL', 'FedEx', 'UPS', 'Maersk', 'Hapag-Lloyd']),
            'status' => fake()->randomElement(['pending', 'in_transit', 'customs', 'delivered', 'cancelled']),
            'current_location' => fake()->city(),
            'estimated_arrival' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'actual_arrival' => fake()->optional()->dateTimeBetween('+1 month', '+2 months'),
            'origin' => fake()->city(),
            'destination' => fake()->city(),
            'metadata' => [],
        ];
    }
}
