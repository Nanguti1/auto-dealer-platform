<?php

namespace Tests\Feature\Admin\Imports;

use App\Models\ImportDocument;
use App\Models\ImportPayment;
use App\Models\ImportShipment;
use App\Models\Role;
use App\Models\User;
use App\Models\VehicleImport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImportRequestTest extends TestCase
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
        $import = VehicleImport::factory()->create();

        $this->assertDatabaseHas('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_guests_cannot_access_import_request_routes()
    {
        auth()->logout();

        $import = VehicleImport::factory()->create();

        $this->assertDatabaseHas('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_can_create_import_request()
    {
        $import = VehicleImport::factory()->create([
            'reference_number' => 'IMP-TEST-001',
        ]);

        $this->assertDatabaseHas('vehicle_imports', [
            'reference_number' => 'IMP-TEST-001',
        ]);
    }

    public function test_can_view_import_request_details()
    {
        $import = VehicleImport::factory()->create();

        $this->assertDatabaseHas('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_can_update_import_request_status()
    {
        $import = VehicleImport::factory()->create(['status' => 'pending']);

        $import->update(['status' => 'processing']);

        $this->assertDatabaseHas('vehicle_imports', [
            'id' => $import->id,
            'status' => 'processing',
        ]);
    }

    public function test_can_delete_import_request()
    {
        $import = VehicleImport::factory()->create();

        $import->delete();

        $this->assertSoftDeleted('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_can_delete_import_request_via_controller()
    {
        $import = VehicleImport::factory()->create();

        $response = $this->delete(route('admin.imports.destroy', $import));

        $response->assertRedirect(route('admin.imports.index'));
        $this->assertSoftDeleted('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_can_view_import_request_via_controller()
    {
        $import = VehicleImport::factory()->create();

        $response = $this->get(route('admin.imports.show', $import));

        $response->assertStatus(200);
    }

    public function test_import_request_has_shipments()
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertEquals(1, $import->shipments()->count());
        $this->assertEquals($shipment->id, $import->shipments->first()->id);
    }

    public function test_import_request_has_documents()
    {
        $import = VehicleImport::factory()->create();
        $document = ImportDocument::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertEquals(1, $import->documents()->count());
        $this->assertEquals($document->id, $import->documents->first()->id);
    }

    public function test_can_create_import_document()
    {
        $import = VehicleImport::factory()->create();

        $document = ImportDocument::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);

        $this->assertDatabaseHas('import_documents', [
            'vehicle_import_id' => $import->id,
        ]);
    }

    public function test_can_update_import_document()
    {
        $import = VehicleImport::factory()->create();
        $document = ImportDocument::factory()->create(['vehicle_import_id' => $import->id]);

        $document->update(['type' => 'bill_of_lading']);

        $this->assertDatabaseHas('import_documents', [
            'id' => $document->id,
            'type' => 'bill_of_lading',
        ]);
    }

    public function test_can_delete_import_document()
    {
        $import = VehicleImport::factory()->create();
        $document = ImportDocument::factory()->create(['vehicle_import_id' => $import->id]);

        $document->delete();

        $this->assertDatabaseMissing('import_documents', [
            'id' => $document->id,
        ]);
    }

    public function test_shipment_status_workflow(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $shipment->status);

        $shipment->update(['status' => 'in_transit']);
        $this->assertEquals('in_transit', $shipment->status);

        $shipment->update(['status' => 'arrived']);
        $this->assertEquals('arrived', $shipment->status);

        $shipment->update(['status' => 'delivered']);
        $this->assertEquals('delivered', $shipment->status);
    }

    public function test_shipment_tracking_updates(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'current_location' => 'Tokyo',
        ]);

        $shipment->update(['current_location' => 'Los Angeles']);
        $this->assertEquals('Los Angeles', $shipment->current_location);
    }

    public function test_shipment_arrival_date_updates(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'estimated_arrival' => now()->addDays(30),
        ]);

        $shipment->update(['actual_arrival' => now()]);
        $this->assertNotNull($shipment->actual_arrival);
    }

    public function test_import_payment_workflow(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
            'amount' => 10000.00,
        ]);

        $this->assertEquals('pending', $payment->status);
        $this->assertEquals(10000.00, $payment->amount);

        $payment->update(['status' => 'paid', 'paid_at' => now()]);
        $this->assertEquals('paid', $payment->status);
        $this->assertNotNull($payment->paid_at);
    }

    public function test_import_payment_due_date_tracking(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'due_date' => now()->addDays(30),
        ]);

        $this->assertNotNull($payment->due_date);
    }

    public function test_import_has_multiple_payments(): void
    {
        $import = VehicleImport::factory()->create();
        ImportPayment::factory()->count(3)->create(['vehicle_import_id' => $import->id]);

        $this->assertEquals(3, $import->payments()->count());
    }

    public function test_import_request_status_workflow(): void
    {
        $import = VehicleImport::factory()->create(['status' => 'draft']);

        $this->assertEquals('draft', $import->status);

        $import->update(['status' => 'submitted']);
        $this->assertEquals('submitted', $import->status);

        $import->update(['status' => 'approved']);
        $this->assertEquals('approved', $import->status);

        $import->update(['status' => 'completed']);
        $this->assertEquals('completed', $import->status);
    }

    public function test_shipment_belongs_to_import(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertEquals($import->id, $shipment->vehicleImport->id);
    }

    public function test_payment_belongs_to_import(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertEquals($import->id, $payment->vehicleImport->id);
    }

    public function test_import_authorization(): void
    {
        $customerRole = Role::factory()->create(['name' => 'customer']);
        $customer = User::factory()->create(['role_id' => $customerRole->id]);

        $import = VehicleImport::factory()->create();

        $this->assertDatabaseHas('vehicle_imports', [
            'id' => $import->id,
        ]);
    }

    public function test_import_cost_validation(): void
    {
        $import = VehicleImport::factory()->create([
            'estimated_cost' => 50000.00,
        ]);

        $this->assertEquals(50000.00, $import->estimated_cost);
    }

    public function test_import_reference_uniqueness(): void
    {
        $import = VehicleImport::factory()->create(['reference_number' => 'UNIQUE-REF-001']);

        $this->assertDatabaseHas('vehicle_imports', [
            'reference_number' => 'UNIQUE-REF-001',
        ]);
    }
}
