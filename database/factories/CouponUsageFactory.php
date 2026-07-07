<?php

namespace Database\Factories;

use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CouponUsage>
 */
class CouponUsageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'coupon_id' => Coupon::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'vehicle_id' => fake()->boolean(70) ? Vehicle::factory() : null,
            'discount_amount' => fake()->randomFloat(2, 50, 5000),
            'used_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
