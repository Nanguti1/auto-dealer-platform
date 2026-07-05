<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Http\Controllers\Public\VehicleController;
use App\Models\BodyType;
use App\Models\FuelType;
use App\Models\Make;
use App\Models\Vehicle;
use App\Models\VehicleCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class FilterOptionsQueryOptimizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_filter_options_uses_withcount_instead_of_n_plus_one(): void
    {
        // Create test data
        $make = Make::factory()->create(['name' => 'Toyota', 'slug' => 'toyota']);
        $bodyType = BodyType::factory()->create(['name' => 'Sedan', 'slug' => 'sedan', 'is_active' => true]);
        $fuelType = FuelType::factory()->create(['name' => 'Gasoline', 'slug' => 'gasoline', 'is_active' => true]);
        $condition = VehicleCondition::factory()->create(['name' => 'New', 'slug' => 'new']);

        // Create vehicles for each filter option
        Vehicle::factory()->count(3)->create([
            'make_id' => $make->id,
            'body_type_id' => $bodyType->id,
            'fuel_type_id' => $fuelType->id,
            'vehicle_condition_id' => $condition->id,
            'sold_at' => null,
            'listed_at' => now(),
        ]);

        // Enable query log
        DB::enableQueryLog();

        // Call getFilterOptions using reflection
        $controller = new VehicleController;
        $reflection = new \ReflectionClass($controller);
        $method = $reflection->getMethod('getFilterOptions');
        $method->setAccessible(true);
        $filterOptions = $method->invoke($controller);

        // Get query count
        $queries = DB::getQueryLog();
        $queryCount = count($queries);

        // Verify we have filter options
        $this->assertIsArray($filterOptions);
        $this->assertArrayHasKey('makes', $filterOptions);
        $this->assertArrayHasKey('bodyTypes', $filterOptions);
        $this->assertArrayHasKey('fuelTypes', $filterOptions);
        $this->assertArrayHasKey('conditions', $filterOptions);

        // Verify counts are present
        $this->assertCount(1, $filterOptions['makes']);
        $this->assertEquals(3, $filterOptions['makes'][0]['count']);

        $this->assertCount(1, $filterOptions['bodyTypes']);
        $this->assertEquals(3, $filterOptions['bodyTypes'][0]['count']);

        $this->assertCount(1, $filterOptions['fuelTypes']);
        $this->assertEquals(3, $filterOptions['fuelTypes'][0]['count']);

        $this->assertCount(1, $filterOptions['conditions']);
        $this->assertEquals(3, $filterOptions['conditions'][0]['count']);

        // With proper eager loading, we should have at most 4 queries (one per filter type)
        // Without optimization, we would have 1 + N queries per filter type
        $this->assertLessThanOrEqual(4, $queryCount, "Too many queries executed. Expected at most 4, got {$queryCount}");

        // Verify the queries use withCount by checking for aggregated counts
        $hasCountQueries = collect($queries)->contains(fn ($query) => str_contains($query['query'], 'count(*) as'));
        $this->assertTrue($hasCountQueries, 'Queries should use count aggregation');
    }

    public function test_filter_options_only_includes_active_items(): void
    {
        // Create active and inactive body types
        $activeBodyType = BodyType::factory()->create(['name' => 'Sedan', 'slug' => 'sedan', 'is_active' => true]);
        $inactiveBodyType = BodyType::factory()->create(['name' => 'Truck', 'slug' => 'truck', 'is_active' => false]);

        // Create vehicles for both
        Vehicle::factory()->create([
            'body_type_id' => $activeBodyType->id,
            'sold_at' => null,
            'listed_at' => now(),
        ]);

        Vehicle::factory()->create([
            'body_type_id' => $inactiveBodyType->id,
            'sold_at' => null,
            'listed_at' => now(),
        ]);

        // Get filter options using reflection
        $controller = new VehicleController;
        $reflection = new \ReflectionClass($controller);
        $method = $reflection->getMethod('getFilterOptions');
        $method->setAccessible(true);
        $filterOptions = $method->invoke($controller);

        // Verify only active body types are included
        $bodyTypeSlugs = collect($filterOptions['bodyTypes'])->pluck('value');
        $this->assertContains('sedan', $bodyTypeSlugs);
        $this->assertNotContains('truck', $bodyTypeSlugs);
    }

    public function test_filter_options_only_includes_available_vehicles(): void
    {
        // Create a make
        $make = Make::factory()->create(['name' => 'Toyota', 'slug' => 'toyota']);

        // Create available and sold vehicles
        Vehicle::factory()->create([
            'make_id' => $make->id,
            'sold_at' => null,
            'listed_at' => now(),
        ]);

        Vehicle::factory()->create([
            'make_id' => $make->id,
            'sold_at' => now(),
            'listed_at' => now(),
        ]);

        Vehicle::factory()->create([
            'make_id' => $make->id,
            'sold_at' => null,
            'listed_at' => null, // Not listed
        ]);

        // Get filter options using reflection
        $controller = new VehicleController;
        $reflection = new \ReflectionClass($controller);
        $method = $reflection->getMethod('getFilterOptions');
        $method->setAccessible(true);
        $filterOptions = $method->invoke($controller);

        // Verify count only includes available vehicles
        $this->assertCount(1, $filterOptions['makes']);
        $this->assertEquals(1, $filterOptions['makes'][0]['count']);
    }
}
