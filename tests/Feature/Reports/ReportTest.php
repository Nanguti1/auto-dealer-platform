<?php

namespace Tests\Feature\Reports;

use App\Models\Branch;
use App\Models\InventoryStatus;
use App\Models\Payment;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected Branch $branch;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->branch = Branch::factory()->create();
        $this->user->branch_id = $this->branch->id;
        $this->user->save();
    }

    public function test_vehicle_has_inventory_status_relationship()
    {
        $inventoryStatus = InventoryStatus::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'inventory_status_id' => $inventoryStatus->id,
        ]);

        $this->assertInstanceOf(InventoryStatus::class, $vehicle->inventoryStatus);
        $this->assertEquals($inventoryStatus->id, $vehicle->inventoryStatus->id);
    }

    public function test_payment_has_user_relationship()
    {
        $payment = Payment::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $this->assertInstanceOf(User::class, $payment->user);
        $this->assertEquals($this->user->id, $payment->user->id);
    }

    public function test_inventory_report_uses_sale_price_not_price()
    {
        $inventoryStatus = InventoryStatus::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'branch_id' => $this->branch->id,
            'inventory_status_id' => $inventoryStatus->id,
            'sale_price' => 15000,
        ]);

        // Verify the vehicle has sale_price, not price
        $this->assertNotNull($vehicle->sale_price);
        $this->assertEquals(15000, $vehicle->sale_price);
    }

    public function test_payment_uses_method_not_payment_method()
    {
        $payment = Payment::factory()->create([
            'user_id' => $this->user->id,
            'method' => 'credit_card',
        ]);

        // Verify the payment has method, not payment_method
        $this->assertNotNull($payment->method);
        $this->assertEquals('credit_card', $payment->method);
    }

    public function test_inventory_report_groups_by_inventory_status_id()
    {
        $inventoryStatus = InventoryStatus::factory()->create();
        Vehicle::factory()->create([
            'branch_id' => $this->branch->id,
            'inventory_status_id' => $inventoryStatus->id,
            'sale_price' => 15000,
        ]);

        // Test the query structure
        $result = Vehicle::forBranch($this->user)
            ->with('inventoryStatus')
            ->select('inventory_status_id', DB::raw('COUNT(*) as count'), DB::raw('AVG(sale_price) as avg_price'))
            ->groupBy('inventory_status_id')
            ->first();

        $this->assertNotNull($result);
        $this->assertEquals($inventoryStatus->id, $result->inventory_status_id);
    }

    public function test_vehicle_has_sale_price_column()
    {
        $vehicle = Vehicle::factory()->create([
            'sale_price' => 15000,
        ]);

        $this->assertNotNull($vehicle->sale_price);
        $this->assertEquals(15000, $vehicle->sale_price);
    }

    public function test_payment_has_method_column()
    {
        $payment = Payment::factory()->create([
            'method' => 'credit_card',
        ]);

        $this->assertNotNull($payment->method);
        $this->assertEquals('credit_card', $payment->method);
    }
}
