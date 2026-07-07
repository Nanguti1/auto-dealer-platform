<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\VehicleHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleHistory>
 */
class VehicleHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventTypes = ['purchase', 'sale', 'service', 'inspection', 'trade_in', 'accident', 'modification', 'mileage_update'];
        $titles = [
            'Vehicle purchased from supplier',
            'Vehicle sold to customer',
            'Scheduled maintenance completed',
            'Pre-sale inspection passed',
            'Trade-in accepted',
            'Minor accident reported',
            'Aftermarket modification installed',
            'Mileage recorded',
        ];

        return [
            'vehicle_id' => Vehicle::factory(),
            'event_type' => fake()->randomElement($eventTypes),
            'event_date' => fake()->dateBetween('-5 years', 'now'),
            'title' => fake()->randomElement($titles),
            'description' => fake()->optional()->paragraph(),
            'metadata' => fake()->boolean(60) ? [
                'technician' => fake()->name(),
                'location' => fake()->city(),
                'cost' => fake()->randomFloat(2, 50, 2000),
                'mileage' => fake()->numberBetween(10000, 150000),
            ] : null,
        ];
    }
}
