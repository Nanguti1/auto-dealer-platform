<?php

declare(strict_types=1);

namespace Tests\Feature\Sales;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use App\Models\Vehicle;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RoleSeeder::class);
        $this->admin = User::factory()->admin()->create();
        $this->actingAs($this->admin);
    }

    public function test_create_page_loads_with_customers_and_vehicles(): void
    {
        $customers = Customer::factory()->count(3)->create();
        $vehicles = Vehicle::factory()->count(2)->create();

        $response = $this->get(route('admin.invoices.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Sales/Invoices/Create')
            ->has('customers')
            ->has('vehicles')
            ->has('reservations')
        );
    }

    public function test_invoice_can_be_created_with_customer(): void
    {
        $customer = Customer::factory()->create();
        $vehicle = Vehicle::factory()->create();

        $response = $this->post(route('admin.invoices.store'), [
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'subtotal' => 10000.00,
            'tax_total' => 800.00,
            'total' => 10800.00,
            'status' => 'draft',
        ]);

        $response->assertRedirect(route('admin.invoices.index'));
        $this->assertDatabaseHas(Invoice::class, [
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'subtotal' => 10000.00,
            'tax_total' => 800.00,
            'total' => 10800.00,
        ]);
    }

    public function test_invoice_show_page_loads_customer_details(): void
    {
        $customer = Customer::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $invoice = Invoice::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'user_id' => $this->admin->id,
            'invoice_number' => 'INV-TEST',
            'subtotal' => 10000.00,
            'tax_total' => 800.00,
            'total' => 10800.00,
            'status' => 'draft',
        ]);

        $response = $this->get(route('admin.invoices.show', $invoice));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Sales/Invoices/Show')
            ->has('invoice.customer')
        );
    }

    public function test_invoice_edit_page_loads_with_customers_and_vehicles(): void
    {
        $customer = Customer::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $invoice = Invoice::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $vehicle->id,
            'user_id' => $this->admin->id,
            'invoice_number' => 'INV-TEST',
            'subtotal' => 10000.00,
            'tax_total' => 800.00,
            'total' => 10800.00,
            'status' => 'draft',
        ]);

        $response = $this->get(route('admin.invoices.edit', $invoice));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Sales/Invoices/Edit')
            ->has('invoice.customer')
            ->has('customers')
            ->has('vehicles')
        );
    }
}
