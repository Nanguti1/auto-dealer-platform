<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->create(['name' => 'admin']);
        Role::factory()->create(['name' => 'manager']);
        Role::factory()->create(['name' => 'customer']);
    }

    public function test_unauthenticated_users_cannot_access_admin_routes(): void
    {
        $adminRoutes = [
            '/admin/dashboard',
            '/admin/vehicles',
            '/admin/customers',
            '/admin/leads',
            '/admin/finance-applications',
            '/admin/settings',
            '/admin/reports',
            '/admin/analytics',
        ];

        foreach ($adminRoutes as $route) {
            $response = $this->get($route);
            $response->assertRedirectToRoute('login');
        }
    }

    public function test_authenticated_non_admin_users_cannot_access_admin_routes(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $user = User::factory()->create(['role_id' => $customerRole->id]);

        $adminRoutes = [
            '/admin/dashboard',
            '/admin/vehicles',
            '/admin/customers',
            '/admin/leads',
            '/admin/finance-applications',
            '/admin/settings',
            '/admin/reports',
            '/admin/analytics',
        ];

        foreach ($adminRoutes as $route) {
            $response = $this->actingAs($user)->get($route);
            $response->assertStatus(403);
        }
    }

    public function test_admin_users_can_access_admin_routes(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $admin = User::factory()->create(['role_id' => $adminRole->id]);

        $adminRoutes = [
            '/admin/dashboard',
            '/admin/vehicles',
            '/admin/customers',
            '/admin/leads',
            '/admin/finance-applications',
            '/admin/settings',
            '/admin/reports',
            '/admin/analytics',
        ];

        foreach ($adminRoutes as $route) {
            $response = $this->actingAs($admin)->get($route);
            $response->assertStatus(200);
        }
    }

    public function test_manager_users_can_access_admin_routes(): void
    {
        $managerRole = Role::where('name', 'manager')->first();
        $manager = User::factory()->create(['role_id' => $managerRole->id]);

        $adminRoutes = [
            '/admin/dashboard',
            '/admin/vehicles',
            '/admin/customers',
            '/admin/leads',
            '/admin/finance-applications',
        ];

        foreach ($adminRoutes as $route) {
            $response = $this->actingAs($manager)->get($route);
            $response->assertStatus(200);
        }
    }

    public function test_nested_admin_resources_are_protected(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $user = User::factory()->create(['role_id' => $customerRole->id]);

        // Create a customer that can be accessed by admin
        $customer = User::factory()->create(['role_id' => $customerRole->id]);

        $nestedRoutes = [
            '/admin/customers/'.$customer->id.'/documents',
            '/admin/customers/'.$customer->id.'/notes',
        ];

        foreach ($nestedRoutes as $route) {
            $response = $this->actingAs($user)->get($route);
            // Should be 403 (forbidden) or 404 (not found due to no documents)
            // Both are acceptable - the key is it shouldn't be 200
            $this->assertNotEquals(200, $response->status());
        }
    }

    public function test_admin_ajax_endpoints_are_protected(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $user = User::factory()->create(['role_id' => $customerRole->id]);

        // Test simple admin routes that don't require complex nested resources
        $adminRoutes = [
            '/admin/blog-categories',
            '/admin/blog-tags',
            '/admin/reviews',
            '/admin/promotions',
        ];

        foreach ($adminRoutes as $route) {
            $response = $this->actingAs($user)->get($route);
            $response->assertStatus(403);
        }
    }

    public function test_public_routes_remain_accessible(): void
    {
        $publicRoutes = [
            '/',
            '/about',
            '/contact',
            '/faq',
            '/inventory',
            '/blog',
        ];

        foreach ($publicRoutes as $route) {
            $response = $this->get($route);
            $response->assertStatus(200);
        }
    }

    public function test_authenticated_customer_routes_remain_accessible(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $user = User::factory()->create(['role_id' => $customerRole->id]);

        $customerRoutes = [
            '/dashboard',
            '/customer/dashboard',
            '/customer/wishlist',
            '/customer/profile',
        ];

        foreach ($customerRoutes as $route) {
            $response = $this->actingAs($user)->get($route);
            $response->assertStatus(200);
        }
    }
}
