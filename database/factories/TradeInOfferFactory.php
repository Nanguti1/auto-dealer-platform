<?php

namespace Database\Factories;

use App\Models\TradeInOffer;
use App\Models\TradeInRequest;
use App\Models\TradeInValuation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TradeInOffer>
 */
class TradeInOfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'accepted', 'rejected', 'expired', 'withdrawn'];
        $terms = [
            'Valid for 7 days from issue date',
            'Subject to vehicle inspection',
            'Offer may be adjusted based on condition',
            'Must present original documentation',
        ];

        return [
            'trade_in_request_id' => TradeInRequest::factory(),
            'valuation_id' => TradeInValuation::factory(),
            'created_by' => User::factory(),
            'offer_amount' => fake()->randomFloat(2, 5000, 50000),
            'valid_until' => fake()->dateBetween('now', '+30 days'),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional()->paragraph(),
            'terms' => fake()->randomElements($terms, fake()->numberBetween(1, 3)),
            'accepted_at' => fake()->optional(20)->dateTimeBetween('-30 days', 'now'),
            'rejected_at' => fake()->optional(20)->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
