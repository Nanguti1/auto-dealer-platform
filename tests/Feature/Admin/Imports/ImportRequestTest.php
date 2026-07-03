<?php

namespace Tests\Feature\Admin\Imports;

use App\Models\ImportDocument;
use App\Models\ImportShipment;
use App\Models\Role;
use App\Models\Supplier;
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
        $response = $this->get(route('admin.imports.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_import_request_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.imports.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_can_create_import_request()
    {
        $supplier = Supplier::factory()->create();

        $response = $this->post(route('admin.imports.store'), [
            'supplier_id' => $supplier->id,
            'reference_number' => 'IMP-TEST-001',
            'origin_country' => 'Japan',
            'destination_port' => 'Los Angeles',
            'estimated_cost' => 50000.00,
            'status' => 'pending',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('vehicle_imports', [
            'reference_number' => 'IMP-TEST-001',
        ]);
    }

    public function test_can_view_import_request_details()
    {
        $import = VehicleImport::factory()->create();

        $response = $this->get(route('admin.imports.show', $import));

        $response->assertOk();
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
            'name' => 'Bill of Lading',
        ]);

        $this->assertDatabaseHas('import_documents', [
            'vehicle_import_id' => $import->id,
            'name' => 'Bill of Lading',
        ]);
    }

    public function test_can_update_import_document()
    {
        $import = VehicleImport::factory()->create();
        $document = ImportDocument::factory()->create(['vehicle_import_id' => $import->id]);

        $document->update(['name' => 'Updated Document Name']);

        $this->assertDatabaseHas('import_documents', [
            'id' => $document->id,
            'name' => 'Updated Document Name',
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
}
