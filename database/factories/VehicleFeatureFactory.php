<?php

namespace Database\Factories;

use App\Models\VehicleFeature;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleFeature>
 */
class VehicleFeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Safety', 'Comfort', 'Technology', 'Performance', 'Exterior', 'Interior'];
        $features = [
            'Bluetooth Connectivity', 'GPS Navigation', 'Backup Camera', 'Heated Seats',
            'Sunroof', 'Leather Interior', 'Lane Assist', 'Adaptive Cruise Control',
            'Keyless Entry', 'Remote Start', 'Apple CarPlay', 'Android Auto',
            'Blind Spot Monitoring', 'Parking Sensors', 'Heated Steering Wheel',
            'Ventilated Seats', 'Premium Audio', 'Wireless Charging', '360-Degree Camera',
        ];

        $featureName = fake()->unique()->randomElement($features);

        return [
            'name' => $featureName,
            'slug' => fake()->slug(),
            'category' => fake()->randomElement($categories),
            'is_active' => fake()->boolean(80),
        ];
    }
}
