<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\FinanceApplication;
use App\Models\Lead;
use App\Models\User;
use App\Models\Vehicle;
use App\Notifications\FinanceApproved;
use App\Notifications\LeadAssigned;
use App\Notifications\VehicleAvailable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_finance_approved_notification_has_correct_content(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $application = FinanceApplication::factory()->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'requested_amount' => 25000.00,
            'estimated_monthly_payment' => 450.00,
            'term_months' => 60,
        ]);

        $application->load('vehicle');
        $user->notify(new FinanceApproved($application));

        Notification::assertSentTo($user, FinanceApproved::class, function ($notification) use ($application, $user) {
            $array = $notification->toArray($user);

            return $array['title'] === 'Finance Application Approved'
                && $array['application_id'] === $application->id;
        });
    }

    public function test_lead_assigned_notification_has_correct_content(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $lead = Lead::factory()->create([
            'assigned_user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '555-1234',
            'source' => 'Website',
            'status' => 'new',
        ]);

        $lead->load('vehicle');
        $user->notify(new LeadAssigned($lead));

        Notification::assertSentTo($user, LeadAssigned::class, function ($notification) use ($lead, $user) {
            $array = $notification->toArray($user);

            return $array['title'] === 'New Lead Assigned'
                && $array['lead_id'] === $lead->id
                && $array['customer_name'] === 'John Doe';
        });
    }

    public function test_vehicle_available_notification_has_correct_content(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create(['sale_price' => 25000.00, 'mileage' => 15000]);

        $user->notify(new VehicleAvailable($vehicle));

        Notification::assertSentTo($user, VehicleAvailable::class, function ($notification) use ($vehicle, $user) {
            $array = $notification->toArray($user);

            return $array['title'] === 'Vehicle Available'
                && $array['vehicle_id'] === $vehicle->id
                && $array['price'] === $vehicle->sale_price;
        });
    }

    public function test_notifications_use_mail_and_database_channels(): void
    {
        Notification::fake();

        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();

        $notification = new VehicleAvailable($vehicle);
        $channels = $notification->via($user);

        $this->assertContains('mail', $channels);
        $this->assertContains('database', $channels);
    }
}
