<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Events\VehicleCreated;
use App\Events\VehicleUpdated;
use App\Models\AuditLog;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class AuditLogTest extends TestCase
{
    use RefreshDatabase;

    public function test_audit_log_model_has_correct_relationships(): void
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();

        $auditLog = AuditLog::create([
            'user_id' => $user->id,
            'auditable_type' => Vehicle::class,
            'auditable_id' => $vehicle->id,
            'event' => VehicleCreated::class,
            'old_values' => null,
            'new_values' => ['test' => 'data'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Test Agent',
        ]);

        $this->assertEquals($user->id, $auditLog->user->id);
        $this->assertEquals($vehicle->id, $auditLog->auditable->id);
    }

    public function test_audit_log_filters_sensitive_data(): void
    {
        $sensitiveData = [
            'password' => 'secret123',
            'api_key' => 'key123',
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ];

        $listener = new \App\Listeners\RecordAuditLog();
        $reflection = new \ReflectionClass($listener);
        $method = $reflection->getMethod('filterSensitiveData');
        $method->setAccessible(true);

        $filtered = $method->invoke($listener, $sensitiveData);

        $this->assertArrayNotHasKey('password', $filtered);
        $this->assertArrayNotHasKey('api_key', $filtered);
        $this->assertArrayHasKey('name', $filtered);
        $this->assertArrayHasKey('email', $filtered);
    }

    public function test_audit_log_service_can_filter_by_user(): void
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();

        AuditLog::create([
            'user_id' => $user->id,
            'auditable_type' => Vehicle::class,
            'auditable_id' => $vehicle->id,
            'event' => 'test.event',
            'old_values' => null,
            'new_values' => ['test' => 'data'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Test Agent',
        ]);

        $service = new \App\Services\Admin\AuditLogService();
        $results = $service->paginate(['user_id' => $user->id]);

        $this->assertCount(1, $results);
        $this->assertEquals($user->id, $results->first()->user_id);
    }

    public function test_audit_log_service_can_search(): void
    {
        $user = User::factory()->create(['name' => 'Test User']);
        $vehicle = Vehicle::factory()->create();

        AuditLog::create([
            'user_id' => $user->id,
            'auditable_type' => Vehicle::class,
            'auditable_id' => $vehicle->id,
            'event' => 'test.event',
            'old_values' => null,
            'new_values' => ['test' => 'data'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Test Agent',
        ]);

        $service = new \App\Services\Admin\AuditLogService();
        $results = $service->paginate(['search' => 'Test']);

        $this->assertGreaterThanOrEqual(1, $results->count());
    }
}
