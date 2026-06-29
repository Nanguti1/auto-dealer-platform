<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerExperienceRoutesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{0: string}>
     */
    public static function customerRouteProvider(): array
    {
        return [
            'trade ins' => ['/customer/trade-ins'],
            'finance applications' => ['/customer/finance-applications'],
            'import requests' => ['/customer/import-requests'],
        ];
    }

    /**
     * @dataProvider customerRouteProvider
     */
    public function test_customer_experience_route_is_available_to_verified_users(string $uri): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $this->actingAs($user)->get($uri)->assertOk();
    }
}
