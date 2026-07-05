<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class ContactFormRateLimitingTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_has_rate_limiting_middleware(): void
    {
        // This test verifies that the rate limiting middleware is applied
        // by checking that the route exists and has the throttle middleware
        $route = $this->app['router']->getRoutes()->getByAction('App\Http\Controllers\Public\ContactController@store');

        $this->assertNotNull($route, 'Contact store route should exist');
        $this->assertContains('throttle:contact', $route->middleware(), 'Contact route should have throttle middleware');
    }

    public function test_contact_rate_limiter_is_configured(): void
    {
        // Verify that the rate limiter is registered in the service provider
        $limiter = RateLimiter::limiter('contact');

        $this->assertNotNull($limiter, 'Contact rate limiter should be configured');

        // Test the limiter by calling it
        $request = Request::create('/contact', 'POST', [
            'email' => 'test@example.com',
        ]);

        $limit = $limiter($request);
        $this->assertNotNull($limit, 'Rate limiter should return a limit');
    }
}
