<?php

namespace Tests\Feature\Admin\Finance;

use App\Actions\Finance\ApproveFinanceApplicationAction;
use App\Actions\Finance\RejectFinanceApplicationAction;
use App\Events\FinanceApproved;
use App\Models\FinanceApplication;
use App\Models\FinanceDocument;
use App\Models\Lender;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Services\Finance\FinanceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
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

    public function test_finance_application_can_be_approved(): void
    {
        Event::fake([FinanceApproved::class]);

        $application = FinanceApplication::factory()->create(['status' => 'submitted']);

        $service = new FinanceService;
        $action = new ApproveFinanceApplicationAction($service);
        $approvedApplication = $action($application);

        $this->assertEquals('approved', $approvedApplication->status);
        Event::assertDispatched(FinanceApproved::class);
    }

    public function test_finance_application_can_be_rejected(): void
    {
        $application = FinanceApplication::factory()->create(['status' => 'submitted']);

        $service = new FinanceService;
        $action = new RejectFinanceApplicationAction($service);
        $rejectedApplication = $action($application);

        $this->assertEquals('rejected', $rejectedApplication->status);
    }

    public function test_finance_application_status_workflow(): void
    {
        $application = FinanceApplication::factory()->create(['status' => 'draft']);

        $this->assertEquals('draft', $application->status);

        $application->update(['status' => 'submitted']);
        $this->assertEquals('submitted', $application->status);

        $application->update(['status' => 'under_review']);
        $this->assertEquals('under_review', $application->status);

        $application->update(['status' => 'approved']);
        $this->assertEquals('approved', $application->status);
    }

    public function test_finance_application_rejection_workflow(): void
    {
        $application = FinanceApplication::factory()->create(['status' => 'submitted']);

        $application->update(['status' => 'under_review']);
        $this->assertEquals('under_review', $application->status);

        $application->update(['status' => 'rejected']);
        $this->assertEquals('rejected', $application->status);
    }

    public function test_finance_application_amount_validation(): void
    {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        $lender = Lender::factory()->create();

        $response = $this->post(route('admin.finance-applications.store'), [
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'lender_id' => $lender->id,
            'requested_amount' => -1000.00,
            'down_payment' => 5000.00,
            'term_months' => 60,
            'interest_rate' => 5.5,
            'estimated_monthly_payment' => 850.00,
            'status' => 'submitted',
            'applicant_data' => ['first_name' => 'John', 'last_name' => 'Doe'],
        ]);

        $response->assertSessionHasErrors('requested_amount');
    }

    public function test_finance_application_term_validation(): void
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
            'term_months' => 0,
            'interest_rate' => 5.5,
            'estimated_monthly_payment' => 850.00,
            'status' => 'submitted',
            'applicant_data' => ['first_name' => 'John', 'last_name' => 'Doe'],
        ]);

        $response->assertSessionHasErrors('term_months');
    }

    public function test_finance_application_requires_vehicle(): void
    {
        $user = User::factory()->create();
        $lender = Lender::factory()->create();

        $response = $this->post(route('admin.finance-applications.store'), [
            'user_id' => $user->id,
            'lender_id' => $lender->id,
            'requested_amount' => 50000.00,
            'down_payment' => 5000.00,
            'term_months' => 60,
            'interest_rate' => 5.5,
            'estimated_monthly_payment' => 850.00,
            'status' => 'submitted',
            'applicant_data' => ['first_name' => 'John', 'last_name' => 'Doe'],
        ]);

        $response->assertSessionHasErrors('vehicle_id');
    }

    public function test_finance_application_documents_count(): void
    {
        $application = FinanceApplication::factory()->create();
        FinanceDocument::factory()->count(3)->create(['finance_application_id' => $application->id]);

        $this->assertEquals(3, $application->documents()->count());
    }

    public function test_finance_application_authorization(): void
    {
        $customerRole = Role::factory()->create(['name' => 'customer']);
        $customer = User::factory()->create(['role_id' => $customerRole->id]);

        $this->actingAs($customer);
        $response = $this->get(route('admin.finance-applications.index'));

        $response->assertStatus(403);

        $this->actingAs($this->admin);
    }

    public function test_finance_application_deletion_removes_documents(): void
    {
        $application = FinanceApplication::factory()->create();
        $document = FinanceDocument::factory()->create(['finance_application_id' => $application->id]);

        $this->delete(route('admin.finance-applications.destroy', $application));

        $this->assertDatabaseMissing('finance_applications', ['id' => $application->id]);
        $this->assertDatabaseMissing('finance_documents', ['id' => $document->id]);
    }
}
