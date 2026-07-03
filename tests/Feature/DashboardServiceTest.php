<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Services\Dashboard\DashboardService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardServiceTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected DashboardService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->service = new DashboardService;
        $this->actingAs($this->admin);
    }

    public function test_summary_returns_structure()
    {
        Vehicle::factory()->count(5)->create(['sold_at' => null]);
        Vehicle::factory()->count(3)->create(['sold_at' => now()]);

        $summary = $this->service->summary();

        $this->assertIsArray($summary);
        $this->assertArrayHasKey('totalVehicles', $summary);
        $this->assertArrayHasKey('availableVehicles', $summary);
        $this->assertArrayHasKey('soldVehicles', $summary);
        $this->assertEquals(8, $summary['totalVehicles']);
        $this->assertEquals(5, $summary['availableVehicles']);
        $this->assertEquals(3, $summary['soldVehicles']);
    }

    public function test_charts_returns_structure()
    {
        Vehicle::factory()->create(['sold_at' => now()->subMonths(1)]);

        $charts = $this->service->charts();

        $this->assertIsArray($charts);
        $this->assertArrayHasKey('sales', $charts);
        $this->assertArrayHasKey('distribution', $charts);
        $this->assertArrayHasKey('operations', $charts);
        $this->assertCount(6, $charts['sales']);
    }

    public function test_charts_inventory_distribution_uses_real_data()
    {
        Vehicle::factory()->count(5)->create(['sold_at' => null]);
        Vehicle::factory()->count(3)->create(['sold_at' => now()]);

        $charts = $this->service->charts();

        $this->assertEquals(5, $charts['distribution'][0]['value']); // Available
        $this->assertEquals(3, $charts['distribution'][2]['value']); // Sold
    }

    public function test_recent_activity_returns_structure()
    {
        $activity = $this->service->recentActivity();

        $this->assertIsArray($activity);
    }
}
