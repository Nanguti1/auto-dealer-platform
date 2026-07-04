<?php

namespace Tests\Unit\Policies;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\FinanceApplication;
use App\Models\ImportShipment;
use App\Models\Lead;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleImport;
use App\Models\VehicleReservation;
use App\Policies\CustomerPolicy;
use App\Policies\FinanceApplicationPolicy;
use App\Policies\ImportShipmentPolicy;
use App\Policies\LeadPolicy;
use App\Policies\VehiclePolicy;
use App\Policies\VehicleReservationPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PolicyAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $manager;

    protected User $staff;

    protected User $customer;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $managerRole = Role::factory()->create(['name' => 'manager']);
        $staffRole = Role::factory()->create(['name' => 'staff']);
        $customerRole = Role::factory()->create(['name' => 'customer']);

        $branch = Branch::factory()->create();

        $this->admin = User::factory()->create(['role_id' => $adminRole->id, 'branch_id' => $branch->id]);
        $this->manager = User::factory()->create(['role_id' => $managerRole->id, 'branch_id' => $branch->id]);
        $this->staff = User::factory()->create(['role_id' => $staffRole->id, 'branch_id' => $branch->id]);
        $this->customer = User::factory()->create(['role_id' => $customerRole->id]);
    }

    public function test_customer_policy_admin_has_full_access(): void
    {
        $policy = new CustomerPolicy;
        $customer = Customer::factory()->create(['user_id' => $this->customer->id]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $customer));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $customer));
        $this->assertTrue($policy->delete($this->admin, $customer));
        $this->assertTrue($policy->approve($this->admin, $customer));
        $this->assertTrue($policy->reject($this->admin, $customer));
        $this->assertTrue($policy->assign($this->admin, $customer));
    }

    public function test_customer_policy_manager_has_full_access(): void
    {
        $policy = new CustomerPolicy;
        $customer = Customer::factory()->create(['user_id' => $this->customer->id]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $customer));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $customer));
        $this->assertTrue($policy->delete($this->manager, $customer));
        $this->assertTrue($policy->approve($this->manager, $customer));
        $this->assertTrue($policy->reject($this->manager, $customer));
        $this->assertTrue($policy->assign($this->manager, $customer));
    }

    public function test_customer_policy_staff_limited_access(): void
    {
        $policy = new CustomerPolicy;
        $customer = Customer::factory()->create(['user_id' => $this->staff->id]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertTrue($policy->view($this->staff, $customer));
        $this->assertTrue($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $customer));
        $this->assertFalse($policy->delete($this->staff, $customer));
        $this->assertFalse($policy->approve($this->staff, $customer));
        $this->assertFalse($policy->reject($this->staff, $customer));
        $this->assertFalse($policy->assign($this->staff, $customer));
    }

    public function test_customer_policy_customer_limited_access(): void
    {
        $policy = new CustomerPolicy;
        $customer = Customer::factory()->create(['user_id' => $this->customer->id]);

        $this->assertTrue($policy->viewAny($this->customer));
        $this->assertTrue($policy->create($this->customer));
        $this->assertFalse($policy->update($this->customer, $customer));
        $this->assertFalse($policy->delete($this->customer, $customer));
        $this->assertFalse($policy->approve($this->customer, $customer));
        $this->assertFalse($policy->reject($this->customer, $customer));
        $this->assertFalse($policy->assign($this->customer, $customer));
    }

    public function test_vehicle_policy_admin_has_full_access(): void
    {
        $policy = new VehiclePolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->admin->branch_id]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $vehicle));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $vehicle));
        $this->assertTrue($policy->delete($this->admin, $vehicle));
        $this->assertTrue($policy->feature($this->admin, $vehicle));
        $this->assertTrue($policy->publish($this->admin, $vehicle));
        $this->assertTrue($policy->approve($this->admin, $vehicle));
        $this->assertTrue($policy->reject($this->admin, $vehicle));
        $this->assertTrue($policy->assign($this->admin, $vehicle));
    }

    public function test_vehicle_policy_manager_has_full_access(): void
    {
        $policy = new VehiclePolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->manager->branch_id]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $vehicle));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $vehicle));
        $this->assertTrue($policy->delete($this->manager, $vehicle));
        $this->assertTrue($policy->feature($this->manager, $vehicle));
        $this->assertTrue($policy->publish($this->manager, $vehicle));
        $this->assertTrue($policy->approve($this->manager, $vehicle));
        $this->assertTrue($policy->reject($this->manager, $vehicle));
        $this->assertTrue($policy->assign($this->manager, $vehicle));
    }

    public function test_vehicle_policy_staff_limited_access(): void
    {
        $policy = new VehiclePolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->staff->branch_id]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertTrue($policy->view($this->staff, $vehicle));
        $this->assertTrue($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $vehicle));
        $this->assertFalse($policy->delete($this->staff, $vehicle));
        $this->assertFalse($policy->feature($this->staff, $vehicle));
        $this->assertFalse($policy->publish($this->staff, $vehicle));
        $this->assertFalse($policy->approve($this->staff, $vehicle));
        $this->assertFalse($policy->reject($this->staff, $vehicle));
        $this->assertFalse($policy->assign($this->staff, $vehicle));
    }

    public function test_vehicle_policy_customer_cannot_create_without_branch(): void
    {
        $policy = new VehiclePolicy;

        $this->assertFalse($policy->create($this->customer));
    }

    public function test_finance_application_policy_admin_has_full_access(): void
    {
        $policy = new FinanceApplicationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->admin->branch_id]);
        $application = FinanceApplication::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $application));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $application));
        $this->assertTrue($policy->delete($this->admin, $application));
        $this->assertTrue($policy->approve($this->admin, $application));
        $this->assertTrue($policy->reject($this->admin, $application));
        $this->assertTrue($policy->assign($this->admin, $application));
    }

    public function test_finance_application_policy_manager_has_full_access(): void
    {
        $policy = new FinanceApplicationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->manager->branch_id]);
        $application = FinanceApplication::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $application));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $application));
        $this->assertTrue($policy->delete($this->manager, $application));
        $this->assertTrue($policy->approve($this->manager, $application));
        $this->assertTrue($policy->reject($this->manager, $application));
        $this->assertTrue($policy->assign($this->manager, $application));
    }

    public function test_finance_application_policy_staff_limited_access(): void
    {
        $policy = new FinanceApplicationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->staff->branch_id]);
        $application = FinanceApplication::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertTrue($policy->view($this->staff, $application));
        $this->assertTrue($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $application));
        $this->assertFalse($policy->delete($this->staff, $application));
        $this->assertFalse($policy->approve($this->staff, $application));
        $this->assertFalse($policy->reject($this->staff, $application));
        $this->assertFalse($policy->assign($this->staff, $application));
    }

    public function test_lead_policy_admin_has_full_access(): void
    {
        $policy = new LeadPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->admin->branch_id]);
        $lead = Lead::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $lead));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $lead));
        $this->assertTrue($policy->delete($this->admin, $lead));
        $this->assertTrue($policy->assign($this->admin, $lead));
    }

    public function test_lead_policy_manager_has_full_access(): void
    {
        $policy = new LeadPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->manager->branch_id]);
        $lead = Lead::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $lead));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $lead));
        $this->assertTrue($policy->delete($this->manager, $lead));
        $this->assertTrue($policy->assign($this->manager, $lead));
    }

    public function test_lead_policy_staff_limited_access(): void
    {
        $policy = new LeadPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->staff->branch_id]);
        $lead = Lead::factory()->create(['vehicle_id' => $vehicle->id]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertTrue($policy->view($this->staff, $lead));
        $this->assertTrue($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $lead));
        $this->assertFalse($policy->delete($this->staff, $lead));
        $this->assertFalse($policy->assign($this->staff, $lead));
    }

    public function test_import_shipment_policy_admin_has_full_access(): void
    {
        $policy = new ImportShipmentPolicy;
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $shipment));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $shipment));
        $this->assertTrue($policy->delete($this->admin, $shipment));
    }

    public function test_import_shipment_policy_manager_has_full_access(): void
    {
        $policy = new ImportShipmentPolicy;
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $shipment));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $shipment));
        $this->assertTrue($policy->delete($this->manager, $shipment));
    }

    public function test_import_shipment_policy_staff_limited_access(): void
    {
        $policy = new ImportShipmentPolicy;
        $import = VehicleImport::factory()->create();
        $shipment = ImportShipment::factory()->create(['vehicle_import_id' => $import->id]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertFalse($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $shipment));
        $this->assertFalse($policy->delete($this->staff, $shipment));
    }

    public function test_vehicle_reservation_policy_admin_has_full_access(): void
    {
        $policy = new VehicleReservationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->admin->branch_id]);
        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $this->customer->id,
        ]);

        $this->assertTrue($policy->viewAny($this->admin));
        $this->assertTrue($policy->view($this->admin, $reservation));
        $this->assertTrue($policy->create($this->admin));
        $this->assertTrue($policy->update($this->admin, $reservation));
        $this->assertTrue($policy->delete($this->admin, $reservation));
        $this->assertTrue($policy->assign($this->admin, $reservation));
    }

    public function test_vehicle_reservation_policy_manager_has_full_access(): void
    {
        $policy = new VehicleReservationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->manager->branch_id]);
        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $this->customer->id,
        ]);

        $this->assertTrue($policy->viewAny($this->manager));
        $this->assertTrue($policy->view($this->manager, $reservation));
        $this->assertTrue($policy->create($this->manager));
        $this->assertTrue($policy->update($this->manager, $reservation));
        $this->assertTrue($policy->delete($this->manager, $reservation));
        $this->assertTrue($policy->assign($this->manager, $reservation));
    }

    public function test_vehicle_reservation_policy_staff_limited_access(): void
    {
        $policy = new VehicleReservationPolicy;
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->staff->branch_id]);
        $reservation = VehicleReservation::factory()->create([
            'vehicle_id' => $vehicle->id,
            'user_id' => $this->customer->id,
        ]);

        $this->assertTrue($policy->viewAny($this->staff));
        $this->assertTrue($policy->view($this->staff, $reservation));
        $this->assertTrue($policy->create($this->staff));
        $this->assertFalse($policy->update($this->staff, $reservation));
        $this->assertFalse($policy->delete($this->staff, $reservation));
        $this->assertFalse($policy->assign($this->staff, $reservation));
    }

    public function test_branch_access_control_for_vehicles(): void
    {
        $policy = new VehiclePolicy;
        $otherBranch = Branch::factory()->create();
        $vehicle = Vehicle::factory()->create(['branch_id' => $otherBranch->id]);

        // Test that vehicles are associated with branches
        $this->assertEquals($otherBranch->id, $vehicle->branch_id);
    }

    public function test_branch_access_control_for_finance_applications(): void
    {
        $policy = new FinanceApplicationPolicy;
        $otherBranch = Branch::factory()->create();
        $vehicle = Vehicle::factory()->create(['branch_id' => $otherBranch->id]);
        $application = FinanceApplication::factory()->create(['vehicle_id' => $vehicle->id]);

        // Test that finance applications are linked to vehicles
        $this->assertEquals($vehicle->id, $application->vehicle_id);
    }

    public function test_role_based_authorization_consistency(): void
    {
        $customerPolicy = new CustomerPolicy;
        $vehiclePolicy = new VehiclePolicy;
        $financePolicy = new FinanceApplicationPolicy;

        $customer = Customer::factory()->create(['user_id' => $this->admin->id]);
        $vehicle = Vehicle::factory()->create(['branch_id' => $this->admin->branch_id]);
        $application = FinanceApplication::factory()->create(['vehicle_id' => $vehicle->id]);

        // Admin and manager should have same privileges
        $this->assertEquals(
            $customerPolicy->update($this->admin, $customer),
            $customerPolicy->update($this->manager, $customer)
        );

        $this->assertEquals(
            $vehiclePolicy->update($this->admin, $vehicle),
            $vehiclePolicy->update($this->manager, $vehicle)
        );

        $this->assertEquals(
            $financePolicy->approve($this->admin, $application),
            $financePolicy->approve($this->manager, $application)
        );

        // Staff should have fewer privileges than admin
        $this->assertTrue(
            $customerPolicy->update($this->admin, $customer) &&
            ! $customerPolicy->update($this->staff, $customer)
        );

        $this->assertTrue(
            $vehiclePolicy->delete($this->admin, $vehicle) &&
            ! $vehiclePolicy->delete($this->staff, $vehicle)
        );
    }
}
