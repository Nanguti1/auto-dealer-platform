<?php

namespace Tests\Feature\CMS;

use App\Models\HomePageSection;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageSectionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create()->assignRole('admin'));
    }

    public function test_home_page_section_accepts_json_content(): void
    {
        $data = [
            'name' => 'Featured Vehicles',
            'slug' => 'featured-vehicles',
            'type' => 'featured_vehicles',
            'content' => '{"brand_ids": [1, 2, 3]}',
            'is_active' => true,
            'sort_order' => 1,
        ];

        $response = $this->post(route('admin.cms.home-page-sections.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('home_page_sections', [
            'name' => 'Featured Vehicles',
            'slug' => 'featured-vehicles',
            'type' => 'featured_vehicles',
        ]);

        $section = HomePageSection::where('slug', 'featured-vehicles')->first();
        $this->assertEquals(['brand_ids' => [1, 2, 3]], $section->content);
    }

    public function test_home_page_section_rejects_invalid_json(): void
    {
        $data = [
            'name' => 'Featured Vehicles',
            'slug' => 'featured-vehicles',
            'type' => 'featured_vehicles',
            'content' => '{invalid json}',
            'is_active' => true,
            'sort_order' => 1,
        ];

        $response = $this->post(route('admin.cms.home-page-sections.store'), $data);

        $response->assertSessionHasErrors('content');
    }

    public function test_home_page_section_update_accepts_json_content(): void
    {
        $section = HomePageSection::factory()->create([
            'name' => 'Test Section',
            'slug' => 'test-section',
            'type' => 'featured_vehicles',
            'content' => ['brand_ids' => [1, 2]],
        ]);

        $data = [
            'name' => 'Updated Section',
            'slug' => 'test-section',
            'type' => 'featured_vehicles',
            'content' => '{"brand_ids": [1, 2, 3, 4]}',
            'is_active' => true,
            'sort_order' => 2,
        ];

        $response = $this->put(route('admin.cms.home-page-sections.update', $section), $data);

        $response->assertRedirect();
        $section->refresh();
        $this->assertEquals(['brand_ids' => [1, 2, 3, 4]], $section->content);
    }
}
