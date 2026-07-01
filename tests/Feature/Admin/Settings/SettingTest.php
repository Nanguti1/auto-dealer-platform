<?php

namespace Tests\Feature\Admin\Settings;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingTest extends TestCase
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
        $response = $this->get(route('admin.settings.index'));

        $response->assertOk();
    }

    public function test_guests_cannot_access_setting_routes()
    {
        auth()->logout();

        $response = $this->get(route('admin.settings.index'));
        $response->assertRedirect(route('login'));
    }
}
