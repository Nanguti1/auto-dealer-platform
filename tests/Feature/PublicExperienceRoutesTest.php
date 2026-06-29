<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicExperienceRoutesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{0: string}>
     */
    public static function publicRouteProvider(): array
    {
        return [
            'about' => ['/about'],
            'contact' => ['/contact'],
            'faq' => ['/faq'],
            'testimonials' => ['/testimonials'],
            'privacy' => ['/privacy'],
            'terms' => ['/terms'],
            'newsletter' => ['/newsletter'],
            'search' => ['/search'],
            'blog index' => ['/blog'],
            'blog show' => ['/blog/top-electric-vehicles-2024'],
            'inventory index' => ['/inventory'],
            'inventory compare' => ['/inventory/compare'],
            'inventory show' => ['/inventory/2024-tesla-model-s'],
            'finance calculator' => ['/finance/calculator'],
            'trade in request' => ['/trade-in/request'],
            'import request' => ['/import/request'],
            'dealer contact' => ['/contact/dealer'],
        ];
    }

    /**
     * @dataProvider publicRouteProvider
     */
    public function test_public_experience_route_is_available(string $uri): void
    {
        $this->get($uri)->assertOk();
    }
}
