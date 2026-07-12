<?php

namespace Tests\Feature\Admin\Inventory;

use App\Models\Role;
use App\Models\User;
use App\Models\VehicleFeature;
use App\Models\Make;
use App\Models\Model;
use App\Models\Branch;
use App\Models\InventoryStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->actingAs($this->admin);
    }

    public function test_index_page_loads_correctly()
    {
        $response = $this->get(route('admin.vehicles.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_vehicle_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.vehicles.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_create_page_loads_with_features()
    {
        VehicleFeature::factory()->count(5)->create();

        $response = $this->get(route('admin.vehicles.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Inventory/Vehicles/Create')
            ->has('features', 5)
        );
    }

    public function test_vehicle_can_be_created_with_features()
    {
        $features = VehicleFeature::factory()->count(3)->create();
        $make = Make::factory()->create();
        $model = Model::factory()->create(['make_id' => $make->id]);
        $branch = Branch::factory()->create();
        $inventoryStatus = InventoryStatus::factory()->create(['slug' => 'available']);

        $response = $this->post(route('admin.vehicles.store'), [
            'title' => 'Test Vehicle',
            'stock_number' => 'TEST123',
            'vin' => 'TESTVIN1234567890',
            'year' => 2024,
            'make_id' => $make->id,
            'model_id' => $model->id,
            'branch_id' => $branch->id,
            'inventory_status_id' => $inventoryStatus->id,
            'features' => $features->pluck('id')->toArray(),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('vehicles', ['stock_number' => 'TEST123']);
        $this->assertDatabaseCount('vehicle_feature_mappings', 3);
    }

    public function test_vehicle_can_be_updated_with_features()
    {
        $features = VehicleFeature::factory()->count(3)->create();
        $vehicle = \App\Models\Vehicle::factory()->create();
        $make = Make::factory()->create();
        $model = Model::factory()->create(['make_id' => $make->id]);

        $response = $this->put(route('admin.vehicles.update', $vehicle), [
            'title' => 'Updated Vehicle',
            'features' => $features->pluck('id')->toArray(),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseCount('vehicle_feature_mappings', 3);
    }
}
