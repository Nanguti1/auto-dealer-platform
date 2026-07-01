<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Lead;
use App\Models\Make;
use App\Models\Model as CarModel;
use App\Models\Payment;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BranchIsolationTest extends TestCase
{
    use RefreshDatabase;

    private Branch $branch1;

    private Branch $branch2;

    private User $userBranch1;

    private User $userBranch2;

    private User $admin;

    private Vehicle $vehicleBranch1;

    private Vehicle $vehicleBranch2;

    private Customer $customerBranch1;

    private Customer $customerBranch2;

    private Lead $leadBranch1;

    private Lead $leadBranch2;

    private Payment $paymentBranch1;

    private Payment $paymentBranch2;

    protected function setUp(): void
    {
        parent::setUp();

        // Create company
        $company = Company::create([
            'name' => 'Test Company',
            'slug' => 'test-company',
        ]);

        // Create branches
        $this->branch1 = Branch::create([
            'company_id' => $company->id,
            'name' => 'Branch 1',
            'slug' => 'branch-1',
            'code' => 'BR1',
            'address_line_1' => '123 Main St',
            'city' => 'New York',
            'state' => 'NY',
        ]);

        $this->branch2 = Branch::create([
            'company_id' => $company->id,
            'name' => 'Branch 2',
            'slug' => 'branch-2',
            'code' => 'BR2',
            'address_line_1' => '456 Oak Ave',
            'city' => 'Los Angeles',
            'state' => 'CA',
        ]);

        // Create roles
        $salesRole = Role::create(['name' => 'sales', 'display_name' => 'Sales']);
        $adminRole = Role::create(['name' => 'admin', 'display_name' => 'Admin']);

        // Create users
        $this->userBranch1 = User::create([
            'name' => 'User Branch 1',
            'email' => 'user1@example.com',
            'password' => bcrypt('password'),
            'branch_id' => $this->branch1->id,
            'role_id' => $salesRole->id,
        ]);

        $this->userBranch2 = User::create([
            'name' => 'User Branch 2',
            'email' => 'user2@example.com',
            'password' => bcrypt('password'),
            'branch_id' => $this->branch2->id,
            'role_id' => $salesRole->id,
        ]);

        $this->admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'branch_id' => $this->branch1->id,
            'role_id' => $adminRole->id,
        ]);

        // Create vehicles (minimal data to avoid factory dependencies)
        // First create the required foreign key relationships
        $make = Make::create(['name' => 'Test Make', 'slug' => 'test-make']);
        $carModel = CarModel::create(['name' => 'Test Model', 'slug' => 'test-model', 'make_id' => $make->id]);

        $this->vehicleBranch1 = Vehicle::create([
            'branch_id' => $this->branch1->id,
            'make_id' => $make->id,
            'model_id' => $carModel->id,
            'year' => 2024,
            'stock_number' => 'BR1-001',
            'vin' => 'VINBR1001',
            'title' => 'Vehicle Branch 1',
            'slug' => 'vehicle-branch-1',
            'mileage' => 10000,
            'cost_price' => 20000.00,
            'sale_price' => 25000.00,
        ]);

        $this->vehicleBranch2 = Vehicle::create([
            'branch_id' => $this->branch2->id,
            'make_id' => $make->id,
            'model_id' => $carModel->id,
            'year' => 2024,
            'stock_number' => 'BR2-001',
            'vin' => 'VINBR2001',
            'title' => 'Vehicle Branch 2',
            'slug' => 'vehicle-branch-2',
            'mileage' => 15000,
            'cost_price' => 22000.00,
            'sale_price' => 27000.00,
        ]);

        // Create customers
        $this->customerBranch1 = Customer::create([
            'user_id' => $this->userBranch1->id,
            'customer_number' => 'CUST-001',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '555-0101',
        ]);

        $this->customerBranch2 = Customer::create([
            'user_id' => $this->userBranch2->id,
            'customer_number' => 'CUST-002',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone' => '555-0102',
        ]);

        // Create leads
        $this->leadBranch1 = Lead::create([
            'vehicle_id' => $this->vehicleBranch1->id,
            'first_name' => 'Mike',
            'last_name' => 'Johnson',
            'email' => 'mike@example.com',
            'phone' => '555-0103',
            'source' => 'website',
            'status' => 'new',
        ]);

        $this->leadBranch2 = Lead::create([
            'vehicle_id' => $this->vehicleBranch2->id,
            'first_name' => 'Sarah',
            'last_name' => 'Williams',
            'email' => 'sarah@example.com',
            'phone' => '555-0104',
            'source' => 'referral',
            'status' => 'new',
        ]);

        // Create payments
        $this->paymentBranch1 = Payment::create([
            'vehicle_id' => $this->vehicleBranch1->id,
            'amount' => 25000.00,
            'currency' => 'USD',
            'method' => 'cash',
            'status' => 'completed',
        ]);

        $this->paymentBranch2 = Payment::create([
            'vehicle_id' => $this->vehicleBranch2->id,
            'amount' => 27000.00,
            'currency' => 'USD',
            'method' => 'finance',
            'status' => 'completed',
        ]);
    }

    public function test_user_can_view_own_branch_vehicles(): void
    {
        $this->actingAs($this->userBranch1);

        // The service should filter to only show branch 1 vehicles
        $this->assertEquals(1, Vehicle::forBranch($this->userBranch1)->count());
        $this->assertTrue(Vehicle::forBranch($this->userBranch1)->get()->contains($this->vehicleBranch1));
        $this->assertFalse(Vehicle::forBranch($this->userBranch1)->get()->contains($this->vehicleBranch2));
    }

    public function test_user_cannot_view_other_branch_vehicles(): void
    {
        $this->actingAs($this->userBranch1);

        // User from branch 1 should not be able to access branch 2 vehicle
        $this->assertFalse($this->vehicleBranch2->isAccessibleBy($this->userBranch1));
    }

    public function test_admin_can_view_all_branches(): void
    {
        $this->actingAs($this->admin);

        // Admin should be able to access all vehicles
        $this->assertTrue($this->vehicleBranch1->isAccessibleBy($this->admin));
        $this->assertTrue($this->vehicleBranch2->isAccessibleBy($this->admin));

        // Admin should see all vehicles in query
        $this->assertEquals(2, Vehicle::forBranch($this->admin)->count());
    }

    public function test_user_without_branch_sees_nothing(): void
    {
        $userWithoutBranch = User::create([
            'name' => 'No Branch User',
            'email' => 'nobranch@example.com',
            'password' => bcrypt('password'),
            'branch_id' => null,
            'role_id' => $this->userBranch1->role_id,
        ]);
        $this->actingAs($userWithoutBranch);

        // User without branch should see no vehicles
        $this->assertEquals(0, Vehicle::forBranch($userWithoutBranch)->count());
    }

    public function test_vehicle_policy_enforces_branch_isolation(): void
    {
        $this->actingAs($this->userBranch1);

        // User can view own branch vehicle
        $this->assertTrue($this->userBranch1->can('view', $this->vehicleBranch1));

        // User cannot view other branch vehicle
        $this->assertFalse($this->userBranch1->can('view', $this->vehicleBranch2));

        // User can update own branch vehicle if they have role
        $this->assertFalse($this->userBranch1->can('update', $this->vehicleBranch1)); // sales role

        // User cannot update other branch vehicle
        $this->assertFalse($this->userBranch1->can('update', $this->vehicleBranch2));
    }

    public function test_admin_can_access_any_branch_data(): void
    {
        $this->actingAs($this->admin);

        // Admin can view any vehicle
        $this->assertTrue($this->admin->can('view', $this->vehicleBranch1));
        $this->assertTrue($this->admin->can('view', $this->vehicleBranch2));
    }

    public function test_branch_aware_trait_prevents_cross_branch_access(): void
    {
        $this->actingAs($this->userBranch1);

        // Direct model access check
        $this->assertTrue($this->vehicleBranch1->isAccessibleBy($this->userBranch1));
        $this->assertFalse($this->vehicleBranch2->isAccessibleBy($this->userBranch1));
    }

    public function test_for_branch_scope_filters_correctly(): void
    {
        $this->actingAs($this->userBranch1);

        // Test the forBranch scope
        $vehicles = Vehicle::forBranch($this->userBranch1)->get();

        $this->assertEquals(1, $vehicles->count());
        $this->assertTrue($vehicles->contains($this->vehicleBranch1));
        $this->assertFalse($vehicles->contains($this->vehicleBranch2));
    }

    public function test_customer_branch_isolation_through_user(): void
    {
        $this->actingAs($this->userBranch1);

        // User should only see customers from their branch (through user relationship)
        $customers = Customer::forBranchThrough($this->userBranch1, 'user')->get();

        $this->assertEquals(1, $customers->count());
        $this->assertTrue($customers->contains($this->customerBranch1));
        $this->assertFalse($customers->contains($this->customerBranch2));
    }

    public function test_lead_branch_isolation_through_vehicle(): void
    {
        $this->actingAs($this->userBranch1);

        // User should only see leads from their branch (through vehicle relationship)
        $leads = Lead::forBranchThrough($this->userBranch1, 'vehicle')->get();

        $this->assertEquals(1, $leads->count());
        $this->assertTrue($leads->contains($this->leadBranch1));
        $this->assertFalse($leads->contains($this->leadBranch2));
    }

    public function test_payment_branch_isolation_through_vehicle(): void
    {
        $this->actingAs($this->userBranch1);

        // User should only see payments from their branch (through vehicle relationship)
        $payments = Payment::forBranchThrough($this->userBranch1, 'vehicle')->get();

        $this->assertEquals(1, $payments->count());
        $this->assertTrue($payments->contains($this->paymentBranch1));
        $this->assertFalse($payments->contains($this->paymentBranch2));
    }

    public function test_admin_can_view_all_customers(): void
    {
        $this->actingAs($this->admin);

        // Admin should see all customers
        $customers = Customer::forBranchThrough($this->admin, 'user')->get();

        $this->assertEquals(2, $customers->count());
        $this->assertTrue($customers->contains($this->customerBranch1));
        $this->assertTrue($customers->contains($this->customerBranch2));
    }

    public function test_admin_can_view_all_leads(): void
    {
        $this->actingAs($this->admin);

        // Admin should see all leads
        $leads = Lead::forBranchThrough($this->admin, 'vehicle')->get();

        $this->assertEquals(2, $leads->count());
        $this->assertTrue($leads->contains($this->leadBranch1));
        $this->assertTrue($leads->contains($this->leadBranch2));
    }

    public function test_admin_can_view_all_payments(): void
    {
        $this->actingAs($this->admin);

        // Admin should see all payments
        $payments = Payment::forBranchThrough($this->admin, 'vehicle')->get();

        $this->assertEquals(2, $payments->count());
        $this->assertTrue($payments->contains($this->paymentBranch1));
        $this->assertTrue($payments->contains($this->paymentBranch2));
    }

    public function test_customer_policy_enforces_branch_isolation(): void
    {
        $this->actingAs($this->userBranch1);

        // User can view own branch customer
        $this->assertTrue($this->userBranch1->can('view', $this->customerBranch1));

        // User cannot view other branch customer
        $this->assertFalse($this->userBranch1->can('view', $this->customerBranch2));
    }

    public function test_lead_policy_enforces_branch_isolation(): void
    {
        $this->actingAs($this->userBranch1);

        // User can view own branch lead
        $this->assertTrue($this->userBranch1->can('view', $this->leadBranch1));

        // User cannot view other branch lead
        $this->assertFalse($this->userBranch1->can('view', $this->leadBranch2));
    }

    public function test_payment_policy_enforces_branch_isolation(): void
    {
        $this->actingAs($this->userBranch1);

        // User can view own branch payment
        $this->assertTrue($this->userBranch1->can('view', $this->paymentBranch1));

        // User cannot view other branch payment
        $this->assertFalse($this->userBranch1->can('view', $this->paymentBranch2));
    }
}
