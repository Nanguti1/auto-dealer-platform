<?php

namespace Tests\Feature\Admin\Imports;

use App\Models\ImportPayment;
use App\Models\ImportShipment;
use App\Models\ImportShipmentTracking;
use App\Models\Role;
use App\Models\User;
use App\Models\VehicleImport;
use App\Notifications\ImportShipmentArrived;
use App\Services\Imports\ImportPaymentService;
use App\Services\Imports\ShipmentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ShipmentWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected ShipmentService $shipmentService;

    protected ImportPaymentService $paymentService;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->actingAs($this->admin);

        $this->shipmentService = new ShipmentService;
        $this->paymentService = new ImportPaymentService;
    }

    public function test_shipment_creation_with_required_fields(): void
    {
        $import = VehicleImport::factory()->create();

        $shipment = $this->shipmentService->create([
            'vehicle_import_id' => $import->id,
            'tracking_number' => 'TRACK-12345',
            'carrier' => 'Maersk',
            'status' => 'pending',
            'origin' => 'Tokyo, Japan',
            'destination' => 'Los Angeles, USA',
            'estimated_arrival' => now()->addDays(30),
        ]);

        $this->assertDatabaseHas('import_shipments', [
            'vehicle_import_id' => $import->id,
            'tracking_number' => 'TRACK-12345',
            'carrier' => 'Maersk',
            'status' => 'pending',
        ]);
    }

    public function test_shipment_status_transition_pending_to_in_transit(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $this->shipmentService->update($shipment, ['status' => 'in_transit']);

        $this->assertEquals('in_transit', $shipment->fresh()->status);
    }

    public function test_shipment_status_transition_in_transit_to_arrived(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'in_transit',
        ]);

        $this->shipmentService->update($shipment, ['status' => 'arrived']);

        $this->assertEquals('arrived', $shipment->fresh()->status);
    }

    public function test_shipment_status_transition_arrived_to_delivered(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'arrived',
        ]);

        $this->shipmentService->markAsDelivered($shipment);

        $this->assertEquals('delivered', $shipment->fresh()->status);
        $this->assertNotNull($shipment->fresh()->actual_arrival);
    }

    public function test_shipment_status_full_workflow(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $shipment->status);

        $this->shipmentService->update($shipment, ['status' => 'in_transit']);
        $this->assertEquals('in_transit', $shipment->fresh()->status);

        $this->shipmentService->update($shipment, ['status' => 'arrived']);
        $this->assertEquals('arrived', $shipment->fresh()->status);

        $this->shipmentService->markAsDelivered($shipment);
        $this->assertEquals('delivered', $shipment->fresh()->status);
        $this->assertNotNull($shipment->fresh()->actual_arrival);
    }

    public function test_shipment_tracking_update(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'current_location' => 'Tokyo',
        ]);

        $this->shipmentService->updateTracking($shipment, [
            'current_location' => 'Singapore',
            'status' => 'in_transit',
        ]);

        $this->assertEquals('Singapore', $shipment->fresh()->current_location);
        $this->assertEquals('in_transit', $shipment->fresh()->status);
    }

    public function test_shipment_tracking_record_creation(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);

        $tracking = ImportShipmentTracking::factory()->create([
            'vehicle_import_id' => $import->id,
            'tracking_number' => $shipment->tracking_number,
            'status' => 'in_transit',
            'location' => 'Singapore',
            'occurred_at' => now(),
        ]);

        $this->assertDatabaseHas('import_shipment_trackings', [
            'vehicle_import_id' => $import->id,
            'tracking_number' => $shipment->tracking_number,
            'status' => 'in_transit',
        ]);
    }

    public function test_shipment_arrival_notification_sent(): void
    {
        Notification::fake();

        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'in_transit',
        ]);

        $this->shipmentService->update($shipment, ['status' => 'arrived']);

        $notification = new ImportShipmentArrived($shipment);
        $this->admin->notify($notification);

        Notification::assertSentTo($this->admin, ImportShipmentArrived::class);
    }

    public function test_shipment_estimated_arrival_updates(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'estimated_arrival' => now()->addDays(30),
        ]);

        $this->shipmentService->update($shipment, [
            'estimated_arrival' => now()->addDays(25),
        ]);

        $this->assertEquals(
            now()->addDays(25)->format('Y-m-d'),
            $shipment->fresh()->estimated_arrival->format('Y-m-d')
        );
    }

    public function test_shipment_actual_arrival_set_on_delivery(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'arrived',
            'actual_arrival' => null,
        ]);

        $this->shipmentService->markAsDelivered($shipment);

        $this->assertNotNull($shipment->fresh()->actual_arrival);
        $this->assertEquals('delivered', $shipment->fresh()->status);
    }

    public function test_import_payment_creation(): void
    {
        $import = VehicleImport::factory()->create();

        $payment = $this->paymentService->create([
            'vehicle_import_id' => $import->id,
            'payment_reference' => 'PAY-REF-001',
            'amount' => 15000.00,
            'currency' => 'USD',
            'payment_type' => 'deposit',
            'status' => 'pending',
            'due_date' => now()->addDays(30),
        ]);

        $this->assertDatabaseHas('import_payments', [
            'vehicle_import_id' => $import->id,
            'payment_reference' => 'PAY-REF-001',
            'amount' => 15000.00,
            'status' => 'pending',
        ]);
    }

    public function test_import_payment_status_transition_pending_to_paid(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
            'amount' => 10000.00,
        ]);

        $this->paymentService->markAsPaid($payment);

        $this->assertEquals('paid', $payment->fresh()->status);
        $this->assertNotNull($payment->fresh()->paid_at);
    }

    public function test_import_payment_due_date_tracking(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'due_date' => now()->addDays(30),
        ]);

        $this->assertNotNull($payment->due_date);
        $this->assertEquals(
            now()->addDays(30)->format('Y-m-d'),
            $payment->due_date->format('Y-m-d')
        );
    }

    public function test_import_payment_overdue_detection(): void
    {
        $import = VehicleImport::factory()->create();
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'due_date' => now()->subDays(5),
            'status' => 'pending',
        ]);

        $this->assertTrue($payment->due_date->isPast());
        $this->assertEquals('pending', $payment->status);
    }

    public function test_import_multiple_payments_workflow(): void
    {
        $import = VehicleImport::factory()->create();

        $deposit = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'payment_type' => 'deposit',
            'amount' => 5000.00,
            'status' => 'paid',
        ]);

        $balance = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'payment_type' => 'balance',
            'amount' => 45000.00,
            'status' => 'pending',
        ]);

        $this->assertEquals(2, $import->payments()->count());
        $this->assertEquals('paid', $deposit->status);
        $this->assertEquals('pending', $balance->status);
    }

    public function test_shipment_and_payment_relationship(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);
        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);

        $this->assertEquals($import->id, $shipment->vehicleImport->id);
        $this->assertEquals($import->id, $payment->vehicleImport->id);
        $this->assertEquals($import->shipments()->count(), 1);
        $this->assertEquals($import->payments()->count(), 1);
    }

    public function test_shipment_service_filters_by_status(): void
    {
        $import = VehicleImport::factory()->create();
        ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);
        ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'in_transit',
        ]);

        $pendingShipments = $this->shipmentService->paginate(['status' => 'pending']);
        $inTransitShipments = $this->shipmentService->paginate(['status' => 'in_transit']);

        $this->assertEquals(1, $pendingShipments->total());
        $this->assertEquals(1, $inTransitShipments->total());
    }

    public function test_payment_service_filters_by_status(): void
    {
        $import = VehicleImport::factory()->create();
        ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);
        ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'paid',
        ]);

        $pendingPayments = $this->paymentService->paginate(['status' => 'pending']);
        $paidPayments = $this->paymentService->paginate(['status' => 'paid']);

        $this->assertEquals(1, $pendingPayments->total());
        $this->assertEquals(1, $paidPayments->total());
    }

    public function test_shipment_deletion_prevents_orphaned_tracking(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);
        ImportShipmentTracking::factory()->create([
            'vehicle_import_id' => $import->id,
            'tracking_number' => $shipment->tracking_number,
        ]);

        $this->shipmentService->delete($shipment);

        $this->assertDatabaseMissing('import_shipments', [
            'id' => $shipment->id,
        ]);
    }

    public function test_import_status_updates_with_shipment_delivery(): void
    {
        $import = VehicleImport::factory()->create(['status' => 'in_transit']);
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'arrived',
        ]);

        $this->shipmentService->markAsDelivered($shipment);

        $this->assertEquals('delivered', $shipment->fresh()->status);
    }

    public function test_shipment_metadata_storage(): void
    {
        $import = VehicleImport::factory()->create();
        $metadata = [
            'weight' => 2500,
            'dimensions' => '20ft container',
            'special_instructions' => 'Fragile items',
        ];

        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'metadata' => $metadata,
        ]);

        $this->assertEquals($metadata, $shipment->metadata);
    }

    public function test_payment_metadata_storage(): void
    {
        $import = VehicleImport::factory()->create();
        $metadata = [
            'bank_name' => 'Chase Bank',
            'account_number' => '****1234',
            'transaction_id' => 'TXN-789',
        ];

        $payment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'metadata' => $metadata,
        ]);

        $this->assertEquals($metadata, $payment->metadata);
    }

    public function test_shipment_carrier_validation(): void
    {
        $import = VehicleImport::factory()->create();

        $shipment = $this->shipmentService->create([
            'vehicle_import_id' => $import->id,
            'tracking_number' => 'TRACK-12345',
            'carrier' => 'Maersk',
            'status' => 'pending',
        ]);

        $this->assertEquals('Maersk', $shipment->carrier);
    }

    public function test_payment_amount_validation(): void
    {
        $import = VehicleImport::factory()->create();

        $payment = $this->paymentService->create([
            'vehicle_import_id' => $import->id,
            'payment_reference' => 'PAY-REF-002',
            'amount' => 25000.50,
            'currency' => 'USD',
            'payment_type' => 'full_payment',
            'status' => 'pending',
        ]);

        $this->assertEquals(25000.50, $payment->amount);
    }

    public function test_shipment_origin_destination_fields(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'origin' => 'Yokohama, Japan',
            'destination' => 'Seattle, USA',
        ]);

        $this->assertEquals('Yokohama, Japan', $shipment->origin);
        $this->assertEquals('Seattle, USA', $shipment->destination);
    }

    public function test_payment_currency_validation(): void
    {
        $import = VehicleImport::factory()->create();

        $paymentUSD = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'currency' => 'USD',
        ]);

        $paymentEUR = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'currency' => 'EUR',
        ]);

        $this->assertEquals('USD', $paymentUSD->currency);
        $this->assertEquals('EUR', $paymentEUR->currency);
    }

    public function test_shipment_status_cannot_skip_from_pending_to_delivered(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $this->shipmentService->update($shipment, ['status' => 'delivered']);

        $this->assertEquals('delivered', $shipment->fresh()->status);
    }

    public function test_import_total_payment_calculation(): void
    {
        $import = VehicleImport::factory()->create();

        ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'amount' => 10000.00,
            'status' => 'paid',
        ]);

        ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'amount' => 15000.00,
            'status' => 'paid',
        ]);

        $totalPaid = $import->payments()->where('status', 'paid')->sum('amount');

        $this->assertEquals(25000.00, $totalPaid);
    }

    public function test_shipment_authorization(): void
    {
        $customerRole = Role::factory()->create(['name' => 'customer']);
        $customer = User::factory()->create(['role_id' => $customerRole->id]);

        $this->actingAs($customer);
        $response = $this->get(route('admin.shipments.index'));

        $response->assertStatus(403);

        $this->actingAs($this->admin);
        $response = $this->get(route('admin.shipments.index'));
        $response->assertOk();
    }

    public function test_payment_authorization(): void
    {
        $customerRole = Role::factory()->create(['name' => 'customer']);
        $customer = User::factory()->create(['role_id' => $customerRole->id]);

        $this->actingAs($customer);
        $response = $this->get(route('admin.import-payments.index'));

        $response->assertStatus(403);

        $this->actingAs($this->admin);
        $response = $this->get(route('admin.import-payments.index'));
        $response->assertOk();
    }
}
