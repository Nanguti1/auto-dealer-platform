<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Lead;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicLeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Vehicle::factory()->create();
    }

    public function test_public_can_submit_inquiry_lead(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'vehicle_id' => $vehicle->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '555-123-4567',
            'message' => 'I am interested in this vehicle.',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Your inquiry has been sent successfully.',
        ]);

        $this->assertDatabaseHas('leads', [
            'vehicle_id' => $vehicle->id,
            'source' => 'vehicle_inquiry',
            'status' => 'new',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '555-123-4567',
            'notes' => 'I am interested in this vehicle.',
        ]);
    }

    public function test_public_can_submit_reservation_lead(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->post('/leads/public', [
            'type' => 'reservation',
            'vehicle_id' => $vehicle->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone' => '555-987-6543',
            'notes' => 'I would like to reserve this vehicle.',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Your reservation request has been submitted.',
        ]);

        $this->assertDatabaseHas('leads', [
            'vehicle_id' => $vehicle->id,
            'source' => 'vehicle_reservation',
            'status' => 'new',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone' => '555-987-6543',
        ]);

        $lead = Lead::where('email', 'jane@example.com')->first();
        $this->assertNotNull($lead);
        $notes = json_decode($lead->notes, true);
        $this->assertIsArray($notes);
        $this->assertTrue($notes['reservation_request'] ?? false);
    }

    public function test_public_can_submit_test_drive_lead(): void
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->post('/leads/public', [
            'type' => 'test-drive',
            'vehicle_id' => $vehicle->id,
            'first_name' => 'Bob',
            'last_name' => 'Johnson',
            'email' => 'bob@example.com',
            'phone' => '555-555-5555',
            'preferred_date' => now()->addDays(3)->toDateString(),
            'notes' => 'I prefer morning appointments.',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Your test drive request has been submitted.',
        ]);

        $this->assertDatabaseHas('leads', [
            'vehicle_id' => $vehicle->id,
            'source' => 'test_drive',
            'status' => 'new',
            'first_name' => 'Bob',
            'last_name' => 'Johnson',
            'email' => 'bob@example.com',
            'phone' => '555-555-5555',
        ]);

        $lead = Lead::where('email', 'bob@example.com')->first();
        $this->assertNotNull($lead);
        $notes = json_decode($lead->notes, true);
        $this->assertIsArray($notes);
        $this->assertArrayHasKey('preferred_date', $notes);
        $this->assertEquals(now()->addDays(3)->toDateString(), $notes['preferred_date']);
    }

    public function test_lead_submission_requires_type(): void
    {
        $response = $this->post('/leads/public', [
            'first_name' => 'John',
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['type']);
    }

    public function test_lead_submission_requires_valid_type(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'invalid-type',
            'first_name' => 'John',
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['type']);
    }

    public function test_lead_submission_requires_first_name(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['first_name']);
    }

    public function test_lead_submission_requires_email(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'first_name' => 'John',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_lead_submission_requires_valid_email(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'first_name' => 'John',
            'email' => 'invalid-email',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_lead_submission_requires_valid_vehicle_id(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'vehicle_id' => 99999,
            'first_name' => 'John',
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['vehicle_id']);
    }

    public function test_test_drive_requires_future_date(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'test-drive',
            'first_name' => 'John',
            'email' => 'john@example.com',
            'preferred_date' => now()->subDay()->toDateString(),
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['preferred_date']);
    }

    public function test_lead_submission_without_vehicle_id(): void
    {
        $response = $this->post('/leads/public', [
            'type' => 'inquiry',
            'first_name' => 'John',
            'email' => 'john@example.com',
            'message' => 'General inquiry.',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
        ]);

        $this->assertDatabaseHas('leads', [
            'vehicle_id' => null,
            'source' => 'vehicle_inquiry',
            'first_name' => 'John',
            'email' => 'john@example.com',
        ]);
    }
}
