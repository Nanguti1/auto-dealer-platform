<?php

namespace Tests\Feature\Admin\CMS;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsPageTest extends TestCase
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
        $response = $this->get(route('admin.cms-pages.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_cms_page_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.cms-pages.index'));
        $response->assertRedirect(route('login'));
    }
}
