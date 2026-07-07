<?php

namespace Database\Factories;

use App\Models\Model as VehicleModel;
use App\Models\TrimLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrimLevel>
 */
class TrimLevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $trimLevels = [
            'Base', 'LX', 'EX', 'SE', 'Sport', 'Limited', 'Touring', 'Premium',
            'Platinum', 'GT', 'RS', 'S', 'SEL', 'Titanium', 'Overland', 'Trailhawk',
            'High Country', 'Denali', 'Ultimate', 'Signature', 'Elite', 'Luxury',
        ];

        return [
            'model_id' => VehicleModel::factory(),
            'name' => fake()->randomElement($trimLevels),
            'slug' => fake()->slug(),
            'is_active' => fake()->boolean(80),
        ];
    }
}
