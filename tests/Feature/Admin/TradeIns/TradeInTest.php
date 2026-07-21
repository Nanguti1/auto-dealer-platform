<?php

namespace Tests\Feature\Admin\TradeIns;

use App\Models\Role;
use App\Models\TradeInRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TradeInTest extends TestCase
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
        $response = $this->get(route('admin.trade-ins.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_trade_in_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.trade-ins.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_condition_report_accepts_string_format()
    {
        $conditionReport = json_encode(['exterior' => 'Good', 'interior' => 'Fair', 'mechanical' => 'Excellent']);

        $response = $this->post(route('admin.trade-ins.store'), [
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2020,
            'vin' => 'TEST123456789',
            'mileage' => 50000,
            'estimated_value' => 15000,
            'offered_value' => 14000,
            'status' => 'pending',
            'condition_report' => $conditionReport,
        ]);

        $response->assertRedirect(route('admin.trade-ins.index'));

        $tradeIn = TradeInRequest::first();
        $this->assertNotNull($tradeIn);
        $this->assertIsArray($tradeIn->condition_report);
        $this->assertEquals(['exterior' => 'Good', 'interior' => 'Fair', 'mechanical' => 'Excellent'], $tradeIn->condition_report);
    }

    public function test_condition_report_accepts_array_format()
    {
        $conditionReport = ['exterior' => 'Good', 'interior' => 'Fair', 'mechanical' => 'Excellent'];

        $response = $this->post(route('admin.trade-ins.store'), [
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2020,
            'vin' => 'TEST123456789',
            'mileage' => 50000,
            'estimated_value' => 15000,
            'offered_value' => 14000,
            'status' => 'pending',
            'condition_report' => $conditionReport,
        ]);

        $response->assertRedirect(route('admin.trade-ins.index'));

        $tradeIn = TradeInRequest::first();
        $this->assertNotNull($tradeIn);
        $this->assertIsArray($tradeIn->condition_report);
        $this->assertEquals(['exterior' => 'Good', 'interior' => 'Fair', 'mechanical' => 'Excellent'], $tradeIn->condition_report);
    }
}
