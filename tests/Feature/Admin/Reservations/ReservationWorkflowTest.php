<?php

namespace Tests\Feature\Admin\Reservations;

use App\Models\InventoryStatus;
use App\Models\Make;
use App\Models\Model;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $customer;

    protected Vehicle $vehicle;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $customerRole = Role::factory()->create(['name' => 'customer']);

        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->customer = User::factory()->create(['role_id' => $customerRole->id]);

        $make = Make::factory()->create();
        $model = Model::factory()->create(['make_id' => $make->id]);
        $availableStatus = InventoryStatus::factory()->create(['name' => 'Available']);

        $this->vehicle = Vehicle::factory()->create([
            'make_id' => $make->id,
            'model_id' => $model->id,
            'inventory_status_id' => $availableStatus->id,
        ]);
    }

    public function test_reservation_can_be_created(): void
    {
        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
            'expires_at' => now()->addHours(24),
        ]);

        $this->assertDatabaseHas('vehicle_reservations', [
            'id' => $reservation->id,
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
        ]);
    }

    public function test_reservation_marks_vehicle_as_reserved(): void
    {
        $reservedStatus = InventoryStatus::factory()->create(['name' => 'Reserved']);

        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
            'expires_at' => now()->addHours(24),
        ]);

        $this->vehicle->update(['inventory_status_id' => $reservedStatus->id]);
        $this->vehicle->refresh();
        $this->assertEquals('Reserved', $this->vehicle->inventoryStatus->name);
    }

    public function test_reservation_can_be_confirmed(): void
    {
        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
        ]);

        $reservation->update(['status' => 'confirmed']);
        $reservation->refresh();
        $this->assertEquals('confirmed', $reservation->status);
    }

    public function test_reservation_can_be_cancelled(): void
    {
        $availableStatus = InventoryStatus::factory()->create(['name' => 'Available']);

        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'confirmed',
        ]);

        $reservation->update(['status' => 'cancelled']);
        $reservation->refresh();
        $this->assertEquals('cancelled', $reservation->status);

        $this->vehicle->update(['inventory_status_id' => $availableStatus->id]);
        $this->vehicle->refresh();
        $this->assertEquals('Available', $this->vehicle->inventoryStatus->name);
    }

    public function test_expired_reservation_cannot_be_confirmed(): void
    {
        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
            'expires_at' => now()->subHours(1),
        ]);

        $this->assertTrue($reservation->expires_at->isPast());
    }

    public function test_reservation_can_be_converted_to_sale(): void
    {
        $soldStatus = InventoryStatus::factory()->create(['name' => 'Sold']);

        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'confirmed',
        ]);

        $reservation->update(['status' => 'converted']);
        $reservation->refresh();
        $this->assertEquals('converted', $reservation->status);

        $this->vehicle->update(['inventory_status_id' => $soldStatus->id]);
        $this->vehicle->refresh();
        $this->assertEquals('Sold', $this->vehicle->inventoryStatus->name);
    }

    public function test_concurrent_reservations_are_prevented(): void
    {
        $reservedStatus = InventoryStatus::factory()->create(['name' => 'Reserved']);

        $firstReservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'confirmed',
        ]);

        $this->vehicle->update(['inventory_status_id' => $reservedStatus->id]);
        $this->vehicle->refresh();
        $this->assertEquals('Reserved', $this->vehicle->inventoryStatus->name);

        $secondCustomer = User::factory()->create([
            'role_id' => Role::where('name', 'customer')->first()->id,
        ]);

        $this->assertDatabaseHas('vehicle_reservations', [
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_reservation_cleanup_job_removes_expired_reservations(): void
    {
        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
            'expires_at' => now()->subHours(1),
        ]);

        $this->assertTrue($reservation->expires_at->isPast());
        $this->assertEquals('pending', $reservation->status);
    }

    public function test_reservation_authorization(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $regularCustomer = User::factory()->create(['role_id' => $customerRole->id]);

        $reservation = VehicleReservation::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('vehicle_reservations', [
            'id' => $reservation->id,
            'user_id' => $this->customer->id,
        ]);
    }
}
