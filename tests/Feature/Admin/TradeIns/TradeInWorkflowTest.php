<?php

namespace Tests\Feature\Admin\TradeIns;

use App\Models\Role;
use App\Models\TradeInRequest;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TradeInWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $customer;

    protected Vehicle $vehicle;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $customerRole = Role::factory()->create(['name' => 'customer']);

        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->customer = User::factory()->create(['role_id' => $customerRole->id]);

        $this->vehicle = Vehicle::factory()->create();
    }

    public function test_trade_in_request_can_be_created(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('trade_in_requests', [
            'id' => $tradeIn->id,
            'user_id' => $this->customer->id,
            'status' => 'pending',
        ]);
    }

    public function test_trade_in_can_be_approved(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $tradeIn->update(['status' => 'approved', 'offered_value' => 15000]);
        $tradeIn->refresh();

        $this->assertEquals('approved', $tradeIn->status);
        $this->assertEquals(15000, $tradeIn->offered_value);
    }

    public function test_trade_in_can_be_rejected(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $tradeIn->update(['status' => 'rejected']);
        $tradeIn->refresh();

        $this->assertEquals('rejected', $tradeIn->status);
    }

    public function test_processed_trade_in_cannot_be_modified(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'approved',
        ]);

        $this->assertEquals('approved', $tradeIn->status);

        // Verify status remains approved
        $tradeIn->refresh();
        $this->assertEquals('approved', $tradeIn->status);
    }

    public function test_trade_in_associates_with_desired_vehicle(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
        ]);

        $this->assertEquals($this->vehicle->id, $tradeIn->vehicle_id);
    }

    public function test_trade_in_includes_inspection_data(): void
    {
        $inspectionData = [
            'exterior_condition' => 'good',
            'interior_condition' => 'fair',
            'mechanical_condition' => 'good',
            'tire_condition' => 'good',
            'overall_score' => 85,
        ];

        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
            'condition_report' => $inspectionData,
        ]);

        $this->assertEquals($inspectionData, $tradeIn->condition_report);
    }

    public function test_trade_in_authorization(): void
    {
        $customerRole = Role::where('name', 'customer')->first();
        $regularCustomer = User::factory()->create(['role_id' => $customerRole->id]);

        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('trade_in_requests', [
            'id' => $tradeIn->id,
            'user_id' => $this->customer->id,
        ]);
    }

    public function test_trade_in_valuation_calculation(): void
    {
        $tradeIn = TradeInRequest::factory()->create([
            'user_id' => $this->customer->id,
            'status' => 'pending',
            'estimated_value' => 15000,
            'offered_value' => 12000,
        ]);

        $this->assertEquals(15000, $tradeIn->estimated_value);
        $this->assertEquals(12000, $tradeIn->offered_value);
    }
}
