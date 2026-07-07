<?php

namespace Database\Factories;

use App\Models\PriceHistory;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PriceHistory>
 */
class PriceHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $oldPrice = fake()->randomFloat(2, 10000, 100000);
        $newPrice = fake()->randomFloat(2, 10000, 100000);
        $reasons = ['Price Adjustment', 'Market Demand', 'Condition Update', 'Promotion', 'Seasonal Pricing', 'Competitor Match'];

        return [
            'vehicle_id' => Vehicle::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'old_price' => $oldPrice,
            'new_price' => $newPrice,
            'reason' => fake()->randomElement($reasons),
        ];
    }
}
