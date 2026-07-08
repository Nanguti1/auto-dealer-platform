<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\FinanceApplication;
use App\Models\Lead;
use App\Models\Payment;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportControllerQueryTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->admin()->create();
    }

    public function test_sales_report_generates_correctly(): void
    {
        Payment::factory()->count(5)->create(['created_at' => now()->subDays(15)]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.sales', [
                'start_date' => now()->subDays(30)->toDateString(),
                'end_date' => now()->toDateString(),
            ]));

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('Admin/Reports/SalesReport')
                ->has('salesData')
                ->has('salesByMake')
                ->has('filters');
        });
    }

    public function test_inventory_report_generates_correctly(): void
    {
        Vehicle::factory()->count(10)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('reports.inventory'));

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('Admin/Reports/InventoryReport')
                ->has('inventoryData')
                ->has('inventoryByMake')
                ->has('inventoryByBodyType')
                ->has('agedInventory');
        });
    }

    public function test_leads_report_generates_correctly(): void
    {
        Lead::factory()->count(5)->create(['created_at' => now()->subDays(15)]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.leads', [
                'start_date' => now()->subDays(30)->toDateString(),
                'end_date' => now()->toDateString(),
            ]));

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('Admin/Reports/LeadReport')
                ->has('leadsByStage')
                ->has('leadsBySource')
                ->has('conversionData')
                ->has('filters');
        });
    }

    public function test_finance_report_generates_correctly(): void
    {
        FinanceApplication::factory()->count(5)->create(['created_at' => now()->subDays(15)]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.finance', [
                'start_date' => now()->subDays(30)->toDateString(),
                'end_date' => now()->toDateString(),
            ]));

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('Admin/Reports/FinanceReport')
                ->has('financeData')
                ->has('financeByStatus')
                ->has('financeByLender')
                ->has('filters');
        });
    }

    public function test_report_index_generates_correctly(): void
    {
        Vehicle::factory()->count(5)->create();
        Payment::factory()->count(3)->create(['created_at' => now()->subDays(15)]);
        Lead::factory()->count(4)->create(['created_at' => now()->subDays(15)]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.index'));

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('Admin/Reports/Index')
                ->has('savedReports')
                ->has('summary');
        });
    }

    public function test_aggregate_functions_work_correctly(): void
    {
        $vehicle = Vehicle::factory()->create();
        Payment::factory()->create([
            'vehicle_id' => $vehicle->id,
            'amount' => 1000,
            'created_at' => now()->subDays(15),
        ]);
        Payment::factory()->create([
            'vehicle_id' => $vehicle->id,
            'amount' => 2000,
            'created_at' => now()->subDays(15),
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.sales', [
                'start_date' => now()->subDays(30)->toDateString(),
                'end_date' => now()->toDateString(),
            ]));

        $response->assertStatus(200);
        $salesData = $response->prop('salesData');

        $this->assertIsArray($salesData);
        $this->assertNotEmpty($salesData);
    }

    public function test_date_function_works_correctly(): void
    {
        Payment::factory()->create([
            'amount' => 1000,
            'created_at' => now()->subDays(15),
        ]);

        $response = $this->actingAs($this->admin)
            ->get(route('reports.sales', [
                'start_date' => now()->subDays(30)->toDateString(),
                'end_date' => now()->toDateString(),
            ]));

        $response->assertStatus(200);
        $salesData = $response->prop('salesData');

        $this->assertIsArray($salesData);
        $this->assertNotEmpty($salesData);
        $this->assertArrayHasKey('date', $salesData[0]);
    }
}
