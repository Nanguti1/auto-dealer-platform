<?php

namespace Database\Factories;

use App\Models\BodyType;
use App\Models\Branch;
use App\Models\Color;
use App\Models\DriveType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\InteriorColor;
use App\Models\InventoryStatus;
use App\Models\Make;
use App\Models\Model;
use App\Models\TransmissionType;
use App\Models\VehicleCategory;
use App\Models\VehicleCondition;
use App\Models\VehicleStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'branch_id' => Branch::factory(),
            'vehicle_category_id' => VehicleCategory::factory(),
            'make_id' => Make::factory(),
            'model_id' => Model::factory(),
            'trim_level_id' => null,
            'body_type_id' => BodyType::factory(),
            'fuel_type_id' => FuelType::factory(),
            'transmission_type_id' => TransmissionType::factory(),
            'drive_type_id' => DriveType::factory(),
            'engine_type_id' => EngineType::factory(),
            'color_id' => Color::factory(),
            'interior_color_id' => InteriorColor::factory(),
            'vehicle_condition_id' => VehicleCondition::factory(),
            'vehicle_status_id' => VehicleStatus::factory(),
            'inventory_status_id' => InventoryStatus::factory(),
            'assigned_user_id' => null,
            'stock_number' => fake()->bothify('???###'),
            'vin' => fake()->bothify('####################'),
            'year' => fake()->numberBetween(2015, 2024),
            'title' => fake()->sentence(3),
            'slug' => fake()->slug(),
            'mileage' => fake()->numberBetween(0, 100000),
            'cost_price' => fake()->randomFloat(2, 10000, 50000),
            'sale_price' => fake()->randomFloat(2, 15000, 60000),
            'msrp' => fake()->randomFloat(2, 20000, 70000),
            'is_featured' => fake()->boolean(),
            'is_certified' => fake()->boolean(),
            'acquired_at' => fake()->date(),
            'listed_at' => fake()->date(),
            'sold_at' => fake()->optional()->date(),
            'description' => fake()->paragraph(),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the vehicle is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the vehicle is certified.
     */
    public function certified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_certified' => true,
        ]);
    }

    /**
     * Indicate that the vehicle is sold.
     */
    public function sold(): static
    {
        return $this->state(fn (array $attributes) => [
            'sold_at' => fake()->date(),
        ]);
    }

    /**
     * Indicate that the vehicle is listed (not sold).
     */
    public function listed(): static
    {
        return $this->state(fn (array $attributes) => [
            'listed_at' => fake()->date(),
            'sold_at' => null,
        ]);
    }
}
