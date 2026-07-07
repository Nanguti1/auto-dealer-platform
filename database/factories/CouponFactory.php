<?php

namespace Database\Factories;

use App\Models\Coupon;
use App\Models\Promotion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['percentage', 'fixed'];
        $usageLimit = fake()->numberBetween(10, 1000);
        $usedCount = fake()->numberBetween(0, $usageLimit);

        return [
            'promotion_id' => fake()->boolean(70) ? Promotion::factory() : null,
            'code' => fake()->bothify('????-###'),
            'type' => fake()->randomElement($types),
            'value' => fake()->randomFloat(2, 5, 50),
            'usage_limit' => $usageLimit,
            'used_count' => $usedCount,
            'starts_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'expires_at' => fake()->dateTimeBetween('now', '+90 days'),
            'is_active' => fake()->boolean(80),
        ];
    }
}
