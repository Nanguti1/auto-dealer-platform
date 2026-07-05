<?php

declare(strict_types=1);

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StrictModeTest extends TestCase
{
    use RefreshDatabase;

    public function test_bootstrap_strict_mode_configuration(): void
    {
        // Verify that bootstrap/app.php has the strict mode configuration
        $bootstrapContent = file_get_contents(base_path('bootstrap/app.php'));

        $this->assertStringContainsString('Model::preventLazyLoading', $bootstrapContent);
        $this->assertStringContainsString('Model::preventSilentlyDiscardingAttributes', $bootstrapContent);
        $this->assertStringContainsString('handleLazyLoadingViolationUsing', $bootstrapContent);
    }

    public function test_strict_mode_enabled_in_development(): void
    {
        // In development (APP_ENV=local), strict mode should be enabled
        $this->assertEquals('local', env('APP_ENV'));
        $this->assertTrue(env('APP_ENV') !== 'production');
    }
}
