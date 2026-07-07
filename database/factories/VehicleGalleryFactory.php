<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\VehicleGallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehicleGallery>
 */
class VehicleGalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_id' => Vehicle::factory(),
            'path' => fake()->imageUrl(800, 600, 'cars'),
            'alt_text' => fake()->sentence(3),
            'is_primary' => fake()->boolean(20),
            'sort_order' => fake()->numberBetween(0, 100),
            'metadata' => [
                'width' => fake()->numberBetween(800, 1920),
                'height' => fake()->numberBetween(600, 1080),
                'size' => fake()->numberBetween(100, 5000),
            ],
        ];
    }
}
