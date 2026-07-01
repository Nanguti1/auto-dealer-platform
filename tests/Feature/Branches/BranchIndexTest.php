<?php

declare(strict_types=1);

namespace Tests\Feature\Branches;

use App\Models\Branch;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BranchIndexTest extends TestCase
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

    public function test_index_page_loads_correctly(): void
    {
        $response = $this->get(route('admin.branches.index'));

        $response->assertOk();
    }

    public function test_create_page_loads_correctly(): void
    {
        $response = $this->get(route('admin.branches.create'));

        $response->assertOk();
    }

    public function test_show_page_loads_correctly(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->get(route('admin.branches.show', $branch));

        $response->assertOk();
    }

    public function test_guests_cannot_access_branch_routes(): void
    {
        auth()->logout();

        $response = $this->get(route('admin.branches.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_branches_index_displays_branches(): void
    {
        Branch::factory()->count(3)->create();

        $response = $this->get(route('admin.branches.index'));

        $response->assertOk()
            ->assertInertia(function ($page) {
                return $page->component('Admin/Branches/Index')
                    ->has('branches.data');
            });
    }

    public function test_branches_index_filters_by_search(): void
    {
        Branch::factory()->create(['name' => 'Main Branch', 'code' => 'MAIN']);
        Branch::factory()->create(['name' => 'Downtown Branch', 'code' => 'DOWNTOWN']);

        $response = $this->get(route('admin.branches.index', ['search' => 'Main']));

        $response->assertOk();
    }

    public function test_branches_index_filters_by_status(): void
    {
        Branch::factory()->create(['name' => 'Active Branch', 'is_active' => true]);
        Branch::factory()->create(['name' => 'Inactive Branch', 'is_active' => false]);

        $response = $this->get(route('admin.branches.index', ['status' => 'active']));

        $response->assertOk();
    }
}
