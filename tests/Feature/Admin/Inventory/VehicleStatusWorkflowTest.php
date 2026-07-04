<?php

namespace Tests\Feature\Admin\Inventory;

use App\Models\InventoryStatus;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleStatusWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected InventoryStatus $availableStatus;

    protected InventoryStatus $reservedStatus;

    protected InventoryStatus $soldStatus;

    protected InventoryStatus $archivedStatus;

    protected InventoryStatus $deliveredStatus;

    protected InventoryStatus $cancelledStatus;

    protected InventoryStatus $returnedStatus;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);

        $this->availableStatus = InventoryStatus::factory()->create(['name' => 'Available', 'slug' => 'available']);
        $this->reservedStatus = InventoryStatus::factory()->create(['name' => 'Reserved', 'slug' => 'reserved']);
        $this->soldStatus = InventoryStatus::factory()->create(['name' => 'Sold', 'slug' => 'sold']);
        $this->archivedStatus = InventoryStatus::factory()->create(['name' => 'Archived', 'slug' => 'archived']);
        $this->deliveredStatus = InventoryStatus::factory()->create(['name' => 'Delivered', 'slug' => 'delivered']);
        $this->cancelledStatus = InventoryStatus::factory()->create(['name' => 'Cancelled', 'slug' => 'cancelled']);
        $this->returnedStatus = InventoryStatus::factory()->create(['name' => 'Returned', 'slug' => 'returned']);
    }

    public function test_vehicle_status_transitions(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->availableStatus->id,
        ]);

        $vehicle->markAsReserved();
        $vehicle->refresh();
        $this->assertEquals($this->reservedStatus->id, $vehicle->inventory_status_id);

        $vehicle->markAsAvailable();
        $vehicle->refresh();
        $this->assertEquals($this->availableStatus->id, $vehicle->inventory_status_id);

        $vehicle->markAsSold($this->admin);
        $vehicle->refresh();
        $this->assertEquals($this->soldStatus->id, $vehicle->inventory_status_id);
    }

    public function test_vehicle_mark_as_reserved_clears_assignment(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->availableStatus->id,
            'assigned_user_id' => $this->admin->id,
        ]);

        $vehicle->markAsReserved();
        $vehicle->refresh();

        $this->assertEquals($this->reservedStatus->id, $vehicle->inventory_status_id);
    }

    public function test_vehicle_mark_as_available_clears_assignment(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->reservedStatus->id,
            'assigned_user_id' => $this->admin->id,
        ]);

        $vehicle->markAsAvailable();
        $vehicle->refresh();

        $this->assertEquals($this->availableStatus->id, $vehicle->inventory_status_id);
        $this->assertNull($vehicle->assigned_user_id);
    }

    public function test_vehicle_mark_as_sold_sets_buyer_and_date(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->reservedStatus->id,
        ]);

        $vehicle->markAsSold($this->admin);
        $vehicle->refresh();

        $this->assertEquals($this->soldStatus->id, $vehicle->inventory_status_id);
        $this->assertEquals($this->admin->id, $vehicle->assigned_user_id);
        $this->assertNotNull($vehicle->sold_at);
        $this->assertFalse($vehicle->is_featured);
    }

    public function test_vehicle_mark_as_delivered_transitions_status(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->soldStatus->id,
            'sold_at' => now(),
        ]);

        $vehicle->markAsDelivered();
        $vehicle->refresh();

        $this->assertEquals($this->deliveredStatus->id, $vehicle->inventory_status_id);
    }

    public function test_vehicle_mark_as_cancelled_clears_assignment_and_date(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->reservedStatus->id,
            'assigned_user_id' => $this->admin->id,
            'sold_at' => now(),
        ]);

        $vehicle->markAsCancelled();
        $vehicle->refresh();

        $this->assertEquals($this->cancelledStatus->id, $vehicle->inventory_status_id);
        $this->assertNull($vehicle->assigned_user_id);
        $this->assertNull($vehicle->sold_at);
    }

    public function test_vehicle_mark_as_returned_clears_assignment_and_date(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->deliveredStatus->id,
            'assigned_user_id' => $this->admin->id,
            'sold_at' => now(),
        ]);

        $vehicle->markAsReturned();
        $vehicle->refresh();

        $this->assertEquals($this->returnedStatus->id, $vehicle->inventory_status_id);
        $this->assertNull($vehicle->assigned_user_id);
        $this->assertNull($vehicle->sold_at);
    }

    public function test_complete_vehicle_lifecycle(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->availableStatus->id,
        ]);

        $this->assertEquals($this->availableStatus->id, $vehicle->inventory_status_id);

        $vehicle->markAsReserved();
        $vehicle->refresh();
        $this->assertEquals($this->reservedStatus->id, $vehicle->inventory_status_id);

        $vehicle->markAsSold($this->admin);
        $vehicle->refresh();
        $this->assertEquals($this->soldStatus->id, $vehicle->inventory_status_id);
        $this->assertNotNull($vehicle->sold_at);

        $vehicle->markAsDelivered();
        $vehicle->refresh();
        $this->assertEquals($this->deliveredStatus->id, $vehicle->inventory_status_id);
    }

    public function test_vehicle_cancellation_then_available_flow(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->reservedStatus->id,
            'assigned_user_id' => $this->admin->id,
        ]);

        $vehicle->markAsCancelled();
        $vehicle->refresh();
        $this->assertEquals($this->cancelledStatus->id, $vehicle->inventory_status_id);
        $this->assertNull($vehicle->assigned_user_id);

        $vehicle->markAsAvailable();
        $vehicle->refresh();
        $this->assertEquals($this->availableStatus->id, $vehicle->inventory_status_id);
    }

    public function test_vehicle_return_then_available_flow(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->deliveredStatus->id,
            'assigned_user_id' => $this->admin->id,
            'sold_at' => now(),
        ]);

        $vehicle->markAsReturned();
        $vehicle->refresh();
        $this->assertEquals($this->returnedStatus->id, $vehicle->inventory_status_id);
        $this->assertNull($vehicle->assigned_user_id);
        $this->assertNull($vehicle->sold_at);

        $vehicle->markAsAvailable();
        $vehicle->refresh();
        $this->assertEquals($this->availableStatus->id, $vehicle->inventory_status_id);
    }

    public function test_featured_flag_cleared_on_sale(): void
    {
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $this->reservedStatus->id,
            'is_featured' => true,
        ]);

        $vehicle->markAsSold($this->admin);
        $vehicle->refresh();

        $this->assertFalse($vehicle->is_featured);
    }
}
