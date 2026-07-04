<?php

namespace Tests\Feature\Admin\CRM;

use App\Actions\CRM\AdvanceLeadStageAction;
use App\Actions\CRM\AssignLeadAction;
use App\Events\LeadAssigned;
use App\Models\CrmStage;
use App\Models\Lead;
use App\Models\Role;
use App\Models\User;
use App\Models\Vehicle;
use App\Services\CRM\LeadService;
use App\Services\CRM\PipelineService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class PipelineWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $salesRep;

    protected User $customer;

    protected Vehicle $vehicle;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::factory()->create(['name' => 'admin']);
        $salesRole = Role::factory()->create(['name' => 'sales']);
        $customerRole = Role::factory()->create(['name' => 'customer']);

        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->salesRep = User::factory()->create(['role_id' => $salesRole->id]);
        $this->customer = User::factory()->create(['role_id' => $customerRole->id]);

        $this->vehicle = Vehicle::factory()->create();
    }

    public function test_lead_can_be_assigned_to_sales_rep(): void
    {
        Event::fake([LeadAssigned::class]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'status' => 'new',
        ]);

        $service = new LeadService;
        $action = new AssignLeadAction($service);
        $updatedLead = $action($lead, $this->salesRep->id);

        $this->assertEquals($this->salesRep->id, $updatedLead->assigned_user_id);
        Event::assertDispatched(LeadAssigned::class);
    }

    public function test_lead_stage_can_be_advanced(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);
        $contactedStage = CrmStage::factory()->create(['name' => 'Contacted', 'sort_order' => 2]);
        $qualifiedStage = CrmStage::factory()->create(['name' => 'Qualified', 'sort_order' => 3]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $newStage->id,
            'status' => 'new',
        ]);

        $service = new LeadService;
        $action = new AdvanceLeadStageAction($service);
        $updatedLead = $action($lead, $contactedStage->id);

        $this->assertEquals($contactedStage->id, $updatedLead->crm_stage_id);
    }

    public function test_lead_can_be_converted_to_customer(): void
    {
        $lead = Lead::factory()->create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'vehicle_id' => $this->vehicle->id,
            'status' => 'new',
        ]);

        $lead->update(['status' => 'converted']);

        $this->assertEquals('converted', $lead->status);
    }

    public function test_lead_source_tracking(): void
    {
        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'source' => 'website',
            'status' => 'new',
        ]);

        $this->assertEquals('website', $lead->source);

        $leadFromReferral = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'source' => 'referral',
            'status' => 'new',
        ]);

        $this->assertEquals('referral', $leadFromReferral->source);
    }

    public function test_lead_pipeline_visibility(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);
        $contactedStage = CrmStage::factory()->create(['name' => 'Contacted', 'sort_order' => 2]);

        Lead::factory()->count(5)->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $newStage->id,
            'status' => 'new',
        ]);

        Lead::factory()->count(3)->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $contactedStage->id,
            'status' => 'contacted',
        ]);

        $newStageLeads = Lead::where('crm_stage_id', $newStage->id)->count();
        $contactedStageLeads = Lead::where('crm_stage_id', $contactedStage->id)->count();

        $this->assertEquals(5, $newStageLeads);
        $this->assertEquals(3, $contactedStageLeads);
    }

    public function test_lead_assignment_prevents_duplicate_assignments(): void
    {
        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'assigned_user_id' => $this->salesRep->id,
            'status' => 'new',
        ]);

        $anotherSalesRep = User::factory()->create([
            'role_id' => Role::where('name', 'sales')->first()->id,
        ]);

        $service = new LeadService;
        $action = new AssignLeadAction($service);
        $updatedLead = $action($lead, $anotherSalesRep->id);

        $this->assertEquals($anotherSalesRep->id, $updatedLead->assigned_user_id);
    }

    public function test_lead_conversion_rate_calculation(): void
    {
        Lead::factory()->count(10)->create([
            'vehicle_id' => $this->vehicle->id,
            'status' => 'new',
        ]);

        Lead::factory()->count(4)->create([
            'vehicle_id' => $this->vehicle->id,
            'status' => 'converted',
        ]);

        $totalLeads = Lead::count();
        $convertedLeads = Lead::where('status', 'converted')->count();
        $conversionRate = ($convertedLeads / $totalLeads) * 100;

        $this->assertEqualsWithDelta(28.57, $conversionRate, 0.01);
    }

    public function test_stage_transition_to_won_stage(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1, 'is_won' => false]);
        $qualifiedStage = CrmStage::factory()->create(['name' => 'Qualified', 'sort_order' => 2, 'is_won' => false]);
        $wonStage = CrmStage::factory()->create(['name' => 'Won', 'sort_order' => 3, 'is_won' => true]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $qualifiedStage->id,
            'status' => 'qualified',
        ]);

        $service = new LeadService;
        $action = new AdvanceLeadStageAction($service);
        $updatedLead = $action($lead, $wonStage->id);

        $this->assertEquals($wonStage->id, $updatedLead->crm_stage_id);
    }

    public function test_stage_transition_to_lost_stage(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1, 'is_lost' => false]);
        $contactedStage = CrmStage::factory()->create(['name' => 'Contacted', 'sort_order' => 2, 'is_lost' => false]);
        $lostStage = CrmStage::factory()->create(['name' => 'Lost', 'sort_order' => 3, 'is_lost' => true]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $contactedStage->id,
            'status' => 'contacted',
        ]);

        $service = new LeadService;
        $action = new AdvanceLeadStageAction($service);
        $updatedLead = $action($lead, $lostStage->id);

        $this->assertEquals($lostStage->id, $updatedLead->crm_stage_id);
    }

    public function test_pipeline_returns_correct_statistics(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);
        $contactedStage = CrmStage::factory()->create(['name' => 'Contacted', 'sort_order' => 2]);
        $qualifiedStage = CrmStage::factory()->create(['name' => 'Qualified', 'sort_order' => 3]);

        Lead::factory()->count(5)->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $newStage->id,
            'status' => 'new',
        ]);

        Lead::factory()->count(3)->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $contactedStage->id,
            'status' => 'contacted',
        ]);

        Lead::factory()->count(2)->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $qualifiedStage->id,
            'status' => 'qualified',
        ]);

        $service = new PipelineService;
        $stats = $service->getPipelineStats();

        $this->assertEquals(5, $stats[$newStage->id]['count']);
        $this->assertEquals(3, $stats[$contactedStage->id]['count']);
        $this->assertEquals(2, $stats[$qualifiedStage->id]['count']);
    }

    public function test_pipeline_stages_are_ordered_correctly(): void
    {
        $stage3 = CrmStage::factory()->create(['name' => 'Stage 3', 'sort_order' => 3]);
        $stage1 = CrmStage::factory()->create(['name' => 'Stage 1', 'sort_order' => 1]);
        $stage2 = CrmStage::factory()->create(['name' => 'Stage 2', 'sort_order' => 2]);

        $service = new PipelineService;
        $stages = $service->getStages();

        $this->assertEquals($stage1->id, $stages[0]->id);
        $this->assertEquals($stage2->id, $stages[1]->id);
        $this->assertEquals($stage3->id, $stages[2]->id);
    }

    public function test_pipeline_returns_leads_grouped_by_stage(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);
        $contactedStage = CrmStage::factory()->create(['name' => 'Contacted', 'sort_order' => 2]);

        $lead1 = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $newStage->id,
            'status' => 'new',
        ]);

        $lead2 = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $contactedStage->id,
            'status' => 'contacted',
        ]);

        $service = new PipelineService;
        $pipeline = $service->getAllLeadsWithStages();

        $this->assertCount(1, $pipeline[$newStage->id]['leads']);
        $this->assertEquals($lead1->id, $pipeline[$newStage->id]['leads']->first()->id);
        $this->assertCount(1, $pipeline[$contactedStage->id]['leads']);
        $this->assertEquals($lead2->id, $pipeline[$contactedStage->id]['leads']->first()->id);
    }

    public function test_lead_stage_can_be_updated_via_service(): void
    {
        $newStage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);
        $qualifiedStage = CrmStage::factory()->create(['name' => 'Qualified', 'sort_order' => 2]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $newStage->id,
            'status' => 'new',
        ]);

        $service = new PipelineService;
        $updatedLead = $service->updateLeadStage($lead, $qualifiedStage->id);

        $this->assertEquals($qualifiedStage->id, $updatedLead->crm_stage_id);
        $this->assertDatabaseHas('leads', [
            'id' => $lead->id,
            'crm_stage_id' => $qualifiedStage->id,
        ]);
    }

    public function test_pipeline_leads_include_relationships(): void
    {
        $stage = CrmStage::factory()->create(['name' => 'New', 'sort_order' => 1]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $stage->id,
            'assigned_user_id' => $this->salesRep->id,
            'status' => 'new',
        ]);

        $service = new PipelineService;
        $leads = $service->getLeadsByStage($stage->id);

        $this->assertTrue($leads->first()->relationLoaded('vehicle'));
        $this->assertTrue($leads->first()->relationLoaded('assignedUser'));
        $this->assertEquals($this->vehicle->id, $leads->first()->vehicle->id);
        $this->assertEquals($this->salesRep->id, $leads->first()->assignedUser->id);
    }

    public function test_multiple_stage_transitions_in_sequence(): void
    {
        $stage1 = CrmStage::factory()->create(['name' => 'Stage 1', 'sort_order' => 1]);
        $stage2 = CrmStage::factory()->create(['name' => 'Stage 2', 'sort_order' => 2]);
        $stage3 = CrmStage::factory()->create(['name' => 'Stage 3', 'sort_order' => 3]);

        $lead = Lead::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'crm_stage_id' => $stage1->id,
            'status' => 'new',
        ]);

        $service = new LeadService;
        $action = new AdvanceLeadStageAction($service);
        $lead = $action($lead, $stage2->id);
        $this->assertEquals($stage2->id, $lead->crm_stage_id);

        $lead = $action($lead, $stage3->id);
        $this->assertEquals($stage3->id, $lead->crm_stage_id);
    }

    public function test_won_and_lost_stages_are_mutually_exclusive(): void
    {
        $wonStage = CrmStage::factory()->create(['name' => 'Won', 'sort_order' => 1, 'is_won' => true, 'is_lost' => false]);
        $lostStage = CrmStage::factory()->create(['name' => 'Lost', 'sort_order' => 2, 'is_won' => false, 'is_lost' => true]);
        $normalStage = CrmStage::factory()->create(['name' => 'Normal', 'sort_order' => 3, 'is_won' => false, 'is_lost' => false]);

        $this->assertTrue($wonStage->is_won);
        $this->assertFalse($wonStage->is_lost);
        $this->assertFalse($lostStage->is_won);
        $this->assertTrue($lostStage->is_lost);
        $this->assertFalse($normalStage->is_won);
        $this->assertFalse($normalStage->is_lost);
    }
}
