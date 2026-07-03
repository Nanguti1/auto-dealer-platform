<?php

namespace Tests\Feature\Public;

use App\Models\Make;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_index_displays_available_vehicles(): void
    {
        $vehicle = Vehicle::factory()->create([
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data')
            ->has('filters')
            ->has('filterOptions')
        );
    }

    public function test_search_filters_by_title(): void
    {
        $vehicle = Vehicle::factory()->create([
            'title' => 'Toyota Camry 2023',
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'title' => 'Honda Accord 2023',
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory?search=Toyota');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data', 1)
            ->where('vehicles.data.0.name', 'Toyota Camry 2023')
        );
    }

    public function test_filter_by_make(): void
    {
        $make = Make::factory()->create(['name' => 'Toyota']);
        $otherMake = Make::factory()->create(['name' => 'Honda']);

        $vehicle = Vehicle::factory()->create([
            'make_id' => $make->id,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'make_id' => $otherMake->id,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get("/inventory?make={$make->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data', 1)
            ->where('vehicles.data.0.brand', 'Toyota')
        );
    }

    public function test_filter_by_price_range(): void
    {
        Vehicle::factory()->create([
            'sale_price' => 15000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'sale_price' => 25000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'sale_price' => 35000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory?minPrice=20000&maxPrice=30000');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data', 1)
            ->where('vehicles.data.0.price', 25000)
        );
    }

    public function test_sort_by_price_asc(): void
    {
        Vehicle::factory()->create([
            'sale_price' => 30000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'sale_price' => 15000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        Vehicle::factory()->create([
            'sale_price' => 25000,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory?sort=price_asc');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->where('vehicles.data.0.price', 15000)
            ->where('vehicles.data.1.price', 25000)
            ->where('vehicles.data.2.price', 30000)
        );
    }

    public function test_pagination_works(): void
    {
        Vehicle::factory()->count(15)->create([
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data', 12)
            ->where('vehicles.current_page', 1)
            ->where('vehicles.last_page', 2)
            ->where('vehicles.total', 15)
        );
    }

    public function test_sold_vehicles_not_displayed(): void
    {
        Vehicle::factory()->create([
            'listed_at' => now(),
            'sold_at' => now(),
        ]);

        Vehicle::factory()->create([
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->has('vehicles.data', 1)
        );
    }

    public function test_show_displays_vehicle_details(): void
    {
        $vehicle = Vehicle::factory()->create([
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get("/inventory/{$vehicle->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/show')
            ->has('vehicle')
            ->has('related')
            ->where('vehicle.id', $vehicle->id)
            ->where('vehicle.slug', $vehicle->slug)
        );
    }

    public function test_show_404_for_sold_vehicle(): void
    {
        $vehicle = Vehicle::factory()->create([
            'listed_at' => now(),
            'sold_at' => now(),
        ]);

        $response = $this->get("/inventory/{$vehicle->slug}");

        $response->assertStatus(404);
    }

    public function test_featured_flag_included_in_response(): void
    {
        $featuredVehicle = Vehicle::factory()->create([
            'is_featured' => true,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $regularVehicle = Vehicle::factory()->create([
            'is_featured' => false,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/inventory');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('inventory/index')
            ->where('vehicles.data', fn ($data) => collect($data)->contains('featured', true))
        );
    }

    public function test_home_page_displays_featured_vehicles(): void
    {
        Vehicle::factory()->count(3)->create([
            'is_featured' => true,
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('featuredVehicles', 3)
            ->has('latestArrivals')
        );
    }

    public function test_home_page_displays_latest_arrivals(): void
    {
        Vehicle::factory()->count(5)->create([
            'listed_at' => now(),
            'sold_at' => null,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('latestArrivals', 3)
        );
    }
}
