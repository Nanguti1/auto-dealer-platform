<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\BodyType;
use App\Models\Customer;
use App\Models\FuelType;
use App\Models\Lead;
use App\Models\Make;
use App\Models\Setting;
use App\Models\Vehicle;
use App\Models\VehicleCondition;
use App\Models\VehicleReservation;
use App\Services\ConfigurationService;
use App\Services\Dashboard\DashboardService;
use App\Services\ReferenceDataService;
use App\Services\Settings\SettingService;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class CachingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    public function test_vehicle_filter_options_are_cached(): void
    {
        $this->actingAs($this->createUser());

        // First call should cache the data
        $response1 = $this->get('/inventory');
        $response1->assertStatus(200);

        // Verify cache key exists
        $this->assertTrue(Cache::has('vehicle.filter.options'));

        // Second call should use cached data
        $response2 = $this->get('/inventory');
        $response2->assertStatus(200);
    }

    public function test_vehicle_filter_options_cache_is_invalidated_on_vehicle_change(): void
    {
        $this->actingAs($this->createUser());

        // Populate cache
        $this->get('/inventory');
        $this->assertTrue(Cache::has('vehicle.filter.options'));

        // Create a vehicle
        Vehicle::factory()->create();

        // Cache should be invalidated
        $this->assertFalse(Cache::has('vehicle.filter.options'));
    }

    public function test_dashboard_summary_is_cached(): void
    {
        $user = $this->createUser();
        $this->actingAs($user);

        $service = new DashboardService;
        $cacheKey = "dashboard.summary.{$user->id}";

        // First call should cache
        $summary1 = $service->summary();
        $this->assertTrue(Cache::has($cacheKey));

        // Second call should use cache
        $summary2 = $service->summary();
        $this->assertEquals($summary1, $summary2);
    }

    public function test_dashboard_cache_is_invalidated_on_lead_change(): void
    {
        $user = $this->createUser();
        $this->actingAs($user);

        $service = new DashboardService;
        $cacheKey = "dashboard.summary.{$user->id}";

        // Populate cache
        $service->summary();
        $this->assertTrue(Cache::has($cacheKey));

        // Create a lead
        Lead::factory()->create();

        // Cache should be invalidated
        $this->assertFalse(Cache::has($cacheKey));
    }

    public function test_settings_are_cached(): void
    {
        Setting::factory()->create(['key' => 'test_key', 'value' => 'test_value', 'group' => 'test']);

        $service = new SettingService;

        // First call should cache
        $value1 = $service->get('test_key');
        $this->assertTrue(Cache::has('settings.key.test_key'));

        // Second call should use cache
        $value2 = $service->get('test_key');
        $this->assertEquals($value1, $value2);
    }

    public function test_settings_cache_is_invalidated_on_setting_change(): void
    {
        $setting = Setting::factory()->create(['key' => 'test_key', 'value' => 'test_value', 'group' => 'test']);

        $service = new SettingService;

        // Populate cache
        $service->get('test_key');
        $this->assertTrue(Cache::has('settings.key.test_key'));

        // Update setting
        $setting->update(['value' => 'new_value']);

        // Cache should be invalidated
        $this->assertFalse(Cache::has('settings.key.test_key'));
    }

    public function test_reference_data_makes_are_cached(): void
    {
        Make::factory()->create(['name' => 'Toyota', 'slug' => 'toyota']);

        $service = new ReferenceDataService;

        // First call should cache
        $makes1 = $service->getMakes();
        $this->assertTrue(Cache::has('reference.makes.all'));

        // Second call should use cache
        $makes2 = $service->getMakes();
        $this->assertEquals($makes1, $makes2);
    }

    public function test_reference_data_cache_is_invalidated_on_make_change(): void
    {
        $make = Make::factory()->create(['name' => 'Toyota', 'slug' => 'toyota']);

        $service = new ReferenceDataService;

        // Populate cache
        $service->getMakes();
        $this->assertTrue(Cache::has('reference.makes.all'));

        // Update make
        $make->update(['name' => 'Toyota Updated']);

        // Cache should be invalidated
        $this->assertFalse(Cache::has('reference.makes.all'));
    }

    public function test_reference_data_body_types_are_cached(): void
    {
        BodyType::factory()->create(['name' => 'Sedan', 'slug' => 'sedan', 'is_active' => true]);

        $service = new ReferenceDataService;

        // First call should cache
        $bodyTypes1 = $service->getBodyTypes();
        $this->assertTrue(Cache::has('reference.bodyTypes.all'));

        // Second call should use cache
        $bodyTypes2 = $service->getBodyTypes();
        $this->assertEquals($bodyTypes1, $bodyTypes2);
    }

    public function test_reference_data_fuel_types_are_cached(): void
    {
        FuelType::factory()->create(['name' => 'Gasoline', 'slug' => 'gasoline', 'is_active' => true]);

        $service = new ReferenceDataService;

        // First call should cache
        $fuelTypes1 = $service->getFuelTypes();
        $this->assertTrue(Cache::has('reference.fuelTypes.all'));

        // Second call should use cache
        $fuelTypes2 = $service->getFuelTypes();
        $this->assertEquals($fuelTypes1, $fuelTypes2);
    }

    public function test_reference_data_conditions_are_cached(): void
    {
        VehicleCondition::factory()->create(['name' => 'New', 'slug' => 'new']);

        $service = new ReferenceDataService;

        // First call should cache
        $conditions1 = $service->getVehicleConditions();
        $this->assertTrue(Cache::has('reference.conditions.all'));

        // Second call should use cache
        $conditions2 = $service->getVehicleConditions();
        $this->assertEquals($conditions1, $conditions2);
    }

    public function test_configuration_values_are_cached(): void
    {
        $service = new ConfigurationService;

        // First call should cache
        $appName1 = $service->getAppName();
        $this->assertTrue(Cache::has('config.app.name'));

        // Second call should use cache
        $appName2 = $service->getAppName();
        $this->assertEquals($appName1, $appName2);
    }

    public function test_cache_keys_work_for_grouped_invalidation(): void
    {
        // Set up data with different cache keys
        Cache::remember('dashboard.summary.1', now()->addHour(), fn () => 'summary');
        Cache::remember('dashboard.activity.1', now()->addHour(), fn () => 'activity');
        Cache::remember('settings.key.test', now()->addHour(), fn () => 'settings');

        // Verify all are cached
        $this->assertTrue(Cache::has('dashboard.summary.1'));
        $this->assertTrue(Cache::has('dashboard.activity.1'));
        $this->assertTrue(Cache::has('settings.key.test'));

        // Flush dashboard-related keys
        Cache::forget('dashboard.summary.1');
        Cache::forget('dashboard.activity.1');

        // Dashboard caches should be cleared, settings should remain
        $this->assertFalse(Cache::has('dashboard.summary.1'));
        $this->assertFalse(Cache::has('dashboard.activity.1'));
        $this->assertTrue(Cache::has('settings.key.test'));
    }

    public function test_dashboard_cache_is_invalidated_on_customer_change(): void
    {
        $user = $this->createUser();
        $this->actingAs($user);

        $service = new DashboardService;
        $cacheKey = "dashboard.summary.{$user->id}";

        // Populate cache
        $service->summary();
        $this->assertTrue(Cache::has($cacheKey));

        // Create a customer
        Customer::factory()->create();

        // Cache should be invalidated
        $this->assertFalse(Cache::has($cacheKey));
    }

    public function test_dashboard_cache_is_invalidated_on_reservation_change(): void
    {
        $user = $this->createUser();
        $this->actingAs($user);

        $service = new DashboardService;
        $cacheKey = "dashboard.summary.{$user->id}";

        // Populate cache
        $service->summary();
        $this->assertTrue(Cache::has($cacheKey));

        // Create a reservation
        VehicleReservation::factory()->create();

        // Cache should be invalidated
        $this->assertFalse(Cache::has($cacheKey));
    }
}
