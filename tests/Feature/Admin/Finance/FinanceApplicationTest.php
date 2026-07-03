<?php

namespace Tests\Feature\Admin\Finance;

use App\Models\FinanceApplication;
use App\Models\FinanceDocument;
use App\Models\Lender;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinanceApplicationTest extends TestCase
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
        $response = $this->get(route('admin.finance-applications.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_finance_application_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.finance-applications.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_can_create_finance_application()
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $lender = Lender::factory()->create();

        $response = $this->post(route('admin.finance-applications.store'), [
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'lender_id' => $lender->id,
            'requested_amount' => 50000.00,
            'down_payment' => 5000.00,
            'term_months' => 60,
            'interest_rate' => 5.5,
            'estimated_monthly_payment' => 850.00,
            'status' => 'submitted',
            'applicant_data' => ['first_name' => 'John', 'last_name' => 'Doe'],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('finance_applications', [
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'requested_amount' => 50000.00,
        ]);
    }

    public function test_can_view_finance_application_details()
    {
        $application = FinanceApplication::factory()->create();

        $response = $this->get(route('admin.finance-applications.show', $application));

        $response->assertOk();
    }

    public function test_can_update_finance_application_status()
    {
        $application = FinanceApplication::factory()->create(['status' => 'submitted']);

        $application->update(['status' => 'approved']);

        $this->assertDatabaseHas('finance_applications', [
            'id' => $application->id,
            'status' => 'approved',
        ]);
    }

    public function test_can_delete_finance_application()
    {
        $application = FinanceApplication::factory()->create();

        $response = $this->delete(route('admin.finance-applications.destroy', $application));

        $response->assertRedirect();
        $this->assertDatabaseMissing('finance_applications', [
            'id' => $application->id,
        ]);
    }

    public function test_finance_application_has_documents()
    {
        $application = FinanceApplication::factory()->create();
        $document = FinanceDocument::factory()->create(['finance_application_id' => $application->id]);

        $this->assertEquals(1, $application->documents()->count());
        $this->assertEquals($document->id, $application->documents->first()->id);
    }

    public function test_finance_application_has_vehicle()
    {
        $application = FinanceApplication::factory()->create();

        $this->assertNotNull($application->vehicle);
        $this->assertEquals($application->vehicle_id, $application->vehicle->id);
    }

    public function test_finance_application_has_user()
    {
        $application = FinanceApplication::factory()->create();

        $this->assertNotNull($application->user);
        $this->assertEquals($application->user_id, $application->user->id);
    }

    public function test_finance_application_has_lender()
    {
        $application = FinanceApplication::factory()->create();

        $this->assertNotNull($application->lender);
        $this->assertEquals($application->lender_id, $application->lender->id);
    }
}
