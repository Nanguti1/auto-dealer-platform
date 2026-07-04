<?php

namespace Database\Factories;

use App\Models\VehicleImport;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImportShipmentTrackingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vehicle_import_id' => VehicleImport::factory(),
            'tracking_number' => fake()->bothify('TRK-########'),
            'carrier' => fake()->randomElement(['DHL', 'FedEx', 'UPS', 'Maersk', 'Hapag-Lloyd']),
            'status' => fake()->randomElement(['pending', 'in_transit', 'customs', 'delivered', 'cancelled']),
            'location' => fake()->city(),
            'occurred_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'metadata' => [],
        ];
    }
}
