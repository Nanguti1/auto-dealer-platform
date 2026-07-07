<?php

namespace Database\Factories;

use App\Models\TradeInRequest;
use App\Models\TradeInValuation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TradeInValuation>
 */
class TradeInValuationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $methods = ['KBB', 'Edmunds', 'BlackBook', 'Manual', 'Market Analysis'];
        $baseValue = fake()->randomFloat(2, 10000, 50000);

        return [
            'trade_in_request_id' => TradeInRequest::factory(),
            'valuation_source_id' => User::factory(),
            'trade_in_value' => $baseValue,
            'wholesale_value' => $baseValue * fake()->randomFloat(2, 0.85, 0.95),
            'retail_value' => $baseValue * fake()->randomFloat(2, 1.10, 1.25),
            'valuation_method' => fake()->randomElement($methods),
            'market_comparables' => [
                'similar_vehicles' => fake()->numberBetween(3, 10),
                'average_price' => $baseValue,
                'price_range' => [
                    'min' => $baseValue * 0.9,
                    'max' => $baseValue * 1.1,
                ],
            ],
            'adjustments' => [
                'mileage_adjustment' => fake()->randomFloat(2, -2000, 1000),
                'condition_adjustment' => fake()->randomFloat(2, -3000, 2000),
                'market_adjustment' => fake()->randomFloat(2, -1500, 1500),
            ],
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
