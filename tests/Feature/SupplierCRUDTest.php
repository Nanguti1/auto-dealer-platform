<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupplierCRUDTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_index_page_loads(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this->actingAs($user)
            ->get(route('admin.suppliers.index'));

        $response->assertStatus(200);
    }

    public function test_supplier_can_be_created(): void
    {
        $user = User::factory()->admin()->create();

        $supplierData = [
            'company_name' => 'Test Supplier Inc.',
            'contact_person' => 'John Doe',
            'supplier_type' => 'vehicle_dealer',
            'email' => 'test@example.com',
            'phone' => '+1234567890',
            'country' => 'United States',
            'city' => 'New York',
            'physical_address' => '123 Test Street',
            'currency' => 'USD',
            'credit_limit' => 100000,
            'status' => 'active',
        ];

        $response = $this->actingAs($user)
            ->post(route('admin.suppliers.store'), $supplierData);

        $response->assertRedirect(route('admin.suppliers.index'));

        $this->assertDatabaseHas('suppliers', [
            'company_name' => 'Test Supplier Inc.',
            'email' => 'test@example.com',
        ]);
    }

    public function test_supplier_can_be_viewed(): void
    {
        $user = User::factory()->admin()->create();
        $supplier = Supplier::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('admin.suppliers.show', $supplier));

        $response->assertStatus(200);
        $response->assertSee($supplier->company_name);
    }

    public function test_supplier_can_be_updated(): void
    {
        $user = User::factory()->admin()->create();
        $supplier = Supplier::factory()->create();

        $updateData = [
            'company_name' => 'Updated Supplier Inc.',
            'contact_person' => 'Jane Doe',
            'supplier_type' => 'vehicle_manufacturer',
            'email' => 'updated@example.com',
            'phone' => '+9876543210',
            'country' => 'Canada',
            'city' => 'Toronto',
            'physical_address' => '456 Updated Street',
            'currency' => 'CAD',
            'credit_limit' => 200000,
            'status' => 'active',
        ];

        $response = $this->actingAs($user)
            ->put(route('admin.suppliers.update', $supplier), $updateData);

        $response->assertRedirect(route('admin.suppliers.index'));

        $this->assertDatabaseHas('suppliers', [
            'id' => $supplier->id,
            'company_name' => 'Updated Supplier Inc.',
            'email' => 'updated@example.com',
        ]);
    }

    public function test_supplier_can_be_deleted(): void
    {
        $user = User::factory()->admin()->create();
        $supplier = Supplier::factory()->create();

        $response = $this->actingAs($user)
            ->delete(route('admin.suppliers.destroy', $supplier));

        $response->assertRedirect(route('admin.suppliers.index'));

        $this->assertSoftDeleted('suppliers', [
            'id' => $supplier->id,
        ]);
    }

    public function test_inventory_manager_can_create_supplier(): void
    {
        $user = User::factory()->create(['role_id' => 5]); // inventory_manager role ID

        $supplierData = [
            'company_name' => 'Test Supplier Inc.',
            'contact_person' => 'John Doe',
            'supplier_type' => 'vehicle_dealer',
            'email' => 'test@example.com',
            'phone' => '+1234567890',
            'country' => 'United States',
            'city' => 'New York',
            'physical_address' => '123 Test Street',
            'currency' => 'USD',
            'credit_limit' => 100000,
            'status' => 'active',
        ];

        $response = $this->actingAs($user)
            ->post(route('admin.suppliers.store'), $supplierData);

        $response->assertRedirect(route('admin.suppliers.index'));

        $this->assertDatabaseHas('suppliers', [
            'company_name' => 'Test Supplier Inc.',
        ]);
    }

    public function test_inventory_manager_cannot_delete_supplier(): void
    {
        $user = User::factory()->create(['role_id' => 5]); // inventory_manager role ID
        $supplier = Supplier::factory()->create();

        $response = $this->actingAs($user)
            ->delete(route('admin.suppliers.destroy', $supplier));

        $response->assertForbidden();

        $this->assertDatabaseHas('suppliers', [
            'id' => $supplier->id,
            'deleted_at' => null,
        ]);
    }
}
