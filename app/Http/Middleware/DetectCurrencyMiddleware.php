<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\Currency\CurrencyService;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class DetectCurrencyMiddleware
{
    protected CurrencyService $currencyService;

    public function __construct(CurrencyService $currencyService)
    {
        $this->currencyService = $currencyService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip currency detection for API routes
        if ($request->is('api/*')) {
            return $next($request);
        }

        // Only run currency detection for actual HTTP requests, not during build
        if ($this->isRunningInBuildMode()) {
            return $next($request);
        }

        // Detect and set currency
        try {
            $currency = $this->currencyService->getCurrentCurrency();

            // Share currency information with Inertia
            Inertia::share('currency', [
                'country' => $this->currencyService->getCountry(),
                'currency' => $currency,
                'currencySymbol' => $this->currencyService->getCurrentSymbol(),
                'exchangeRate' => $this->currencyService->getCurrentExchangeRate(),
            ]);
        } catch (\Exception $e) {
            // Fallback to default currency if detection fails
            Inertia::share('currency', [
                'country' => 'US',
                'currency' => 'USD',
                'currencySymbol' => '$',
                'exchangeRate' => 1,
            ]);
        }

        return $next($request);
    }

    /**
     * Check if running in build mode
     */
    protected function isRunningInBuildMode(): bool
    {
        return app()->runningInConsole() || app()->environment('testing');
    }
}
