<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Invoice;
use App\Models\InventoryStatus;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\Refund;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use Database\Seeders\InventoryStatusSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SalesWorkflowTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $admin;
    protected User $customer;
    protected Vehicle $vehicle;
    protected Branch $branch;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed inventory statuses
        $this->seed(InventoryStatusSeeder::class);

        $adminRole = Role::where('name', 'admin')->first() ?? Role::factory()->create(['name' => 'admin']);
        $customerRole = Role::where('name', 'customer')->first() ?? Role::factory()->create(['name' => 'customer']);

        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->customer = User::factory()->create(['role_id' => $customerRole->id]);
        $this->branch = Branch::factory()->create();
        $this->vehicle = Vehicle::factory()->create([
            'branch_id' => $this->branch->id,
            'inventory_status_id' => InventoryStatus::where('slug', 'available')->first()->id,
        ]);
    }

    public function test_complete_sales_workflow_from_reservation_to_sale(): void
    {
        $this->actingAs($this->admin);

        // Step 1: Create a reservation
        $reservationData = [
            'vehicle_id' => $this->vehicle->id,
            'user_id' => $this->customer->id,
            'deposit_amount' => 500.00,
            'status' => 'pending',
            'expires_at' => now()->addDays(7),
        ];

        $response = $this->post(route('admin.reservations.store'), $reservationData);
        $response->assertRedirect(route('admin.reservations.index'));

        $reservation = VehicleReservation::where('vehicle_id', $this->vehicle->id)->first();
        $this->assertNotNull($reservation);
        $this->assertEquals('pending', $reservation->status);

        // Step 2: Confirm the reservation
        $response = $this->patch(route('admin.reservations.confirm', $reservation));
        $response->assertSessionHas('success');

        $reservation->refresh();
        $this->assertEquals('confirmed', $reservation->status);

        $this->vehicle->refresh();
        $this->assertEquals('reserved', $this->vehicle->inventoryStatus->slug);

        // Step 3: Convert reservation to sale
        $response = $this->patch(route('admin.reservations.convert-to-sale', $reservation));
        $response->assertRedirect(route('admin.invoices.create', [
            'vehicle_id' => $this->vehicle->id,
            'user_id' => $this->customer->id,
        ]));

        $reservation->refresh();
        $this->assertEquals('converted', $reservation->status);

        $this->vehicle->refresh();
        $this->assertEquals('sold', $this->vehicle->inventoryStatus->slug);
        $this->assertEquals($this->customer->id, $this->vehicle->assigned_user_id);
        $this->assertNotNull($this->vehicle->sold_at);
    }

    public function test_invoice_creation_with_payment(): void
    {
        $this->actingAs($this->admin);

        // Mark vehicle as sold
        $this->vehicle->update([
            'inventory_status_id' => InventoryStatus::where('slug', 'sold')->first()->id,
            'assigned_user_id' => $this->customer->id,
            'sold_at' => now(),
        ]);

        // Create payment first
        $payment = Payment::create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'amount' => 25000.00,
            'currency' => 'USD',
            'method' => 'bank_transfer',
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        // Create invoice
        $invoiceData = [
            'vehicle_id' => $this->vehicle->id,
            'payment_id' => $payment->id,
            'user_id' => $this->customer->id,
            'branch_id' => $this->branch->id,
            'invoice_number' => 'INV-' . $this->faker->unique()->numberBetween(1000, 9999),
            'subtotal' => 25000.00,
            'tax_total' => 2000.00,
            'total' => 27000.00,
            'issued_at' => now(),
            'due_at' => now()->addDays(30),
            'status' => 'draft',
        ];

        $response = $this->post(route('admin.invoices.store'), $invoiceData);
        $response->assertRedirect(route('admin.invoices.index'));

        $invoice = Invoice::where('vehicle_id', $this->vehicle->id)->first();
        $this->assertNotNull($invoice);
        $this->assertEquals(27000.00, $invoice->total);
    }

    public function test_payment_receipt_workflow(): void
    {
        $this->actingAs($this->admin);

        // Create payment
        $payment = Payment::create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'amount' => 500.00,
            'currency' => 'USD',
            'method' => 'credit_card',
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        // Create receipt
        $receiptData = [
            'payment_id' => $payment->id,
            'user_id' => $this->customer->id,
            'receipt_number' => 'REC-' . $this->faker->unique()->numberBetween(1000, 9999),
            'amount' => 500.00,
            'payment_method' => 'credit_card',
            'status' => 'issued',
        ];

        $response = $this->post(route('admin.receipts.store'), $receiptData);
        $response->assertRedirect(route('admin.receipts.index'));

        $receipt = Receipt::where('payment_id', $payment->id)->first();
        $this->assertNotNull($receipt);
        $this->assertEquals(500.00, $receipt->amount);
    }

    public function test_refund_workflow(): void
    {
        $this->actingAs($this->admin);

        // Create payment
        $payment = Payment::create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'amount' => 1000.00,
            'currency' => 'USD',
            'method' => 'bank_transfer',
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        // Create refund
        $refundData = [
            'payment_id' => $payment->id,
            'user_id' => $this->customer->id,
            'refund_number' => 'REF-' . $this->faker->unique()->numberBetween(1000, 9999),
            'amount' => 500.00,
            'reason' => 'Customer request',
            'status' => 'pending',
        ];

        $response = $this->post(route('admin.refunds.store'), $refundData);
        $response->assertRedirect(route('admin.refunds.index'));

        $refund = Refund::where('payment_id', $payment->id)->first();
        $this->assertNotNull($refund);
        $this->assertEquals(500.00, $refund->amount);

        // Process refund
        $response = $this->patch(route('admin.refunds.process', $refund));
        $response->assertSessionHas('success');

        $refund->refresh();
        $this->assertEquals('processed', $refund->status);

        $payment->refresh();
        $this->assertEquals('refunded', $payment->status);
    }

    public function test_invoice_total_validation(): void
    {
        $this->actingAs($this->admin);

        $invoiceData = [
            'vehicle_id' => $this->vehicle->id,
            'user_id' => $this->customer->id,
            'branch_id' => $this->branch->id,
            'subtotal' => 1000.00,
            'tax_total' => 200.00,
            'total' => 1500.00, // Wrong total (should be 1200.00)
            'issued_at' => now(),
            'due_at' => now()->addDays(30),
        ];

        $response = $this->post(route('admin.invoices.store'), $invoiceData);
        $response->assertSessionHasErrors('total');
    }

    public function test_refund_amount_exceeds_payment(): void
    {
        $this->actingAs($this->admin);

        $payment = Payment::create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'amount' => 500.00,
            'currency' => 'USD',
            'method' => 'cash',
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        $refundData = [
            'payment_id' => $payment->id,
            'user_id' => $this->customer->id,
            'amount' => 1000.00, // Exceeds payment amount
            'reason' => 'Testing validation',
        ];

        $response = $this->post(route('admin.refunds.store'), $refundData);
        $response->assertSessionHasErrors('amount');
    }

    public function test_vehicle_status_transitions(): void
    {
        $this->actingAs($this->admin);

        // Initial state should be available
        $this->assertEquals('available', $this->vehicle->inventoryStatus->slug);

        // Reserve vehicle
        $this->vehicle->markAsReserved();
        $this->vehicle->refresh();
        $this->assertEquals('reserved', $this->vehicle->inventoryStatus->slug);

        // Mark as sold
        $this->vehicle->markAsSold($this->customer);
        $this->vehicle->refresh();
        $this->assertEquals('sold', $this->vehicle->inventoryStatus->slug);
        $this->assertEquals($this->customer->id, $this->vehicle->assigned_user_id);

        // Mark as delivered
        $this->vehicle->markAsDelivered();
        $this->vehicle->refresh();
        $this->assertEquals('delivered', $this->vehicle->inventoryStatus->slug);

        // Test return scenario
        $this->vehicle->markAsReturned();
        $this->vehicle->refresh();
        $this->assertEquals('returned', $this->vehicle->inventoryStatus->slug);
        $this->assertNull($this->vehicle->assigned_user_id);
        $this->assertNull($this->vehicle->sold_at);

        // Test cancellation
        $this->vehicle->markAsCancelled();
        $this->vehicle->refresh();
        $this->assertEquals('cancelled', $this->vehicle->inventoryStatus->slug);
        $this->assertNull($this->vehicle->assigned_user_id);

        // Mark as available again
        $this->vehicle->markAsAvailable();
        $this->vehicle->refresh();
        $this->assertEquals('available', $this->vehicle->inventoryStatus->slug);
    }

    public function test_reservation_cancellation_releases_vehicle(): void
    {
        $this->actingAs($this->admin);

        // Create and confirm reservation
        $reservation = VehicleReservation::create([
            'vehicle_id' => $this->vehicle->id,
            'user_id' => $this->customer->id,
            'deposit_amount' => 500.00,
            'status' => 'confirmed',
            'expires_at' => now()->addDays(7),
        ]);

        $this->vehicle->markAsReserved();
        $this->assertEquals('reserved', $this->vehicle->inventoryStatus->slug);

        // Cancel reservation
        $response = $this->patch(route('admin.reservations.cancel', $reservation));
        $response->assertSessionHas('success');

        $reservation->refresh();
        $this->assertEquals('cancelled', $reservation->status);

        $this->vehicle->refresh();
        $this->assertEquals('available', $this->vehicle->inventoryStatus->slug);
    }
}
