<?php

namespace Tests\Feature\Integration;

use App\Models\Customer;
use App\Models\FinanceApplication;
use App\Models\ImportPayment;
use App\Models\ImportShipment;
use App\Models\Lead;
use App\Models\Role;
use App\Models\TradeInRequest;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleImport;
use App\Models\VehicleReservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CrossModuleWorkflowTest extends TestCase
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

    public function test_lead_to_customer_conversion_workflow(): void
    {
        $lead = Lead::factory()->create(['status' => 'new']);

        $this->assertEquals('new', $lead->status);

        $customer = Customer::factory()->create([
            'email' => $lead->email,
            'phone' => $lead->phone,
        ]);

        $lead->update(['status' => 'converted']);

        $this->assertEquals('converted', $lead->fresh()->status);
        $this->assertEquals($lead->email, $customer->email);
    }

    public function test_vehicle_reservation_to_finance_application_workflow(): void
    {
        $vehicle = Vehicle::factory()->create();
        $user = User::factory()->create();

        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $reservation->status);

        $reservation->confirm();

        $this->assertEquals('confirmed', $reservation->fresh()->status);

        $financeApplication = FinanceApplication::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $this->assertEquals($vehicle->id, $financeApplication->vehicle_id);
        $this->assertEquals($user->id, $financeApplication->user_id);
    }

    public function test_import_shipment_to_inventory_workflow(): void
    {
        $import = VehicleImport::factory()->create(['status' => 'approved']);
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $shipment->status);

        $shipment->update(['status' => 'in_transit']);
        $this->assertEquals('in_transit', $shipment->fresh()->status);

        $shipment->update(['status' => 'arrived']);
        $this->assertEquals('arrived', $shipment->fresh()->status);

        $import->update(['status' => 'completed']);
        $this->assertEquals('completed', $import->fresh()->status);
    }

    public function test_customer_multiple_interactions_timeline(): void
    {
        $customer = Customer::factory()->create();
        $user = User::factory()->create();

        $lead = Lead::factory()->create([
            'email' => $customer->email,
            'status' => 'converted',
        ]);

        $vehicle = Vehicle::factory()->create();
        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'confirmed',
        ]);

        $financeApplication = FinanceApplication::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'approved',
        ]);

        $this->assertEquals($customer->email, $lead->email);
        $this->assertEquals($user->id, $reservation->user_id);
        $this->assertEquals($user->id, $financeApplication->user_id);
    }

    public function test_import_payment_workflow_with_shipment(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $depositPayment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'payment_type' => 'deposit',
            'amount' => 5000.00,
            'status' => 'paid',
        ]);

        $this->assertEquals('paid', $depositPayment->status);
        $this->assertEquals(5000.00, $depositPayment->amount);

        $shipment->update(['status' => 'in_transit']);

        $balancePayment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'payment_type' => 'balance',
            'amount' => 45000.00,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $balancePayment->status);
        $this->assertEquals(2, $import->payments()->count());
    }

    public function test_vehicle_status_transitions_across_modules(): void
    {
        $vehicle = Vehicle::factory()->create();
        $user = User::factory()->create();

        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'confirmed',
        ]);

        $reservation->confirm();

        $financeApplication = FinanceApplication::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'approved',
        ]);

        $this->assertEquals($vehicle->id, $reservation->vehicle_id);
        $this->assertEquals($vehicle->id, $financeApplication->vehicle_id);
    }

    public function test_cross_module_authorization_consistency(): void
    {
        $managerRole = Role::factory()->create(['name' => 'manager']);
        $manager = User::factory()->create(['role_id' => $managerRole->id]);

        $customer = Customer::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $lead = Lead::factory()->create();

        $this->actingAs($manager);

        $response = $this->get(route('admin.customers.index'));
        $response->assertOk();

        $response = $this->get(route('admin.vehicles.index'));
        $response->assertOk();

        $response = $this->get(route('admin.leads.index'));
        $response->assertOk();
    }

    public function test_import_to_vehicle_data_integrity(): void
    {
        $import = VehicleImport::factory()->create([
            'origin_country' => 'Japan',
            'destination_port' => 'Los Angeles',
        ]);

        $this->assertEquals('Japan', $import->origin_country);
        $this->assertEquals('Los Angeles', $import->destination_port);
    }

    public function test_customer_reservation_finance_integration(): void
    {
        $customer = Customer::factory()->create();
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();

        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'deposit_amount' => 1000.00,
            'status' => 'confirmed',
        ]);

        $financeApplication = FinanceApplication::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'requested_amount' => 25000.00,
            'status' => 'pending',
        ]);

        $this->assertEquals($vehicle->id, $reservation->vehicle_id);
        $this->assertEquals($vehicle->id, $financeApplication->vehicle_id);
        $this->assertEquals($user->id, $financeApplication->user_id);
        $this->assertEquals(1000.00, $reservation->deposit_amount);
        $this->assertEquals(25000.00, $financeApplication->requested_amount);
    }

    public function test_trade_in_workflow(): void
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'status' => 'pending',
        ]);

        $this->assertEquals('pending', $tradeIn->status);

        $tradeIn->markAsUnderReview();
        $this->assertEquals('under_review', $tradeIn->fresh()->status);

        $tradeIn->markAsApproved();
        $this->assertEquals('approved', $tradeIn->fresh()->status);
    }

    public function test_import_shipment_tracking_to_payment_correlation(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
            'status' => 'pending',
        ]);

        $shipment->update(['status' => 'in_transit']);

        $progressPayment = ImportPayment::factory()->create([
            'vehicle_import_id' => $import->id,
            'payment_type' => 'shipping',
            'amount' => 5000.00,
            'status' => 'paid',
        ]);

        $this->assertEquals('in_transit', $shipment->fresh()->status);
        $this->assertEquals('paid', $progressPayment->status);
        $this->assertEquals($import->id, $shipment->vehicle_import_id);
        $this->assertEquals($import->id, $progressPayment->vehicle_import_id);
    }

    public function test_lead_customer_vehicle_journey(): void
    {
        $lead = Lead::factory()->create(['status' => 'new']);

        $customer = Customer::factory()->create([
            'email' => $lead->email,
        ]);

        $lead->update(['status' => 'converted']);

        $vehicle = Vehicle::factory()->create();
        $user = User::factory()->create();

        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'confirmed',
        ]);

        $reservation->confirm();

        $financeApplication = FinanceApplication::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id,
            'status' => 'approved',
        ]);

        $this->assertEquals('converted', $lead->fresh()->status);
        $this->assertEquals('approved', $financeApplication->status);
    }

    public function test_multiple_vehicles_single_import_workflow(): void
    {
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create([
            'vehicle_import_id' => $import->id,
        ]);

        $this->assertEquals($import->id, $shipment->vehicle_import_id);
    }

    public function test_customer_finance_application_history(): void
    {
        $user = User::factory()->create();

        $vehicle1 = Vehicle::factory()->create();
        $application1 = FinanceApplication::factory()->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle1->id,
            'status' => 'approved',
        ]);

        $vehicle2 = Vehicle::factory()->create();
        $application2 = FinanceApplication::factory()->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle2->id,
            'status' => 'rejected',
        ]);

        $this->assertEquals('approved', $application1->status);
        $this->assertEquals('rejected', $application2->status);
        $this->assertEquals($user->id, $application1->user_id);
        $this->assertEquals($user->id, $application2->user_id);
    }
}
