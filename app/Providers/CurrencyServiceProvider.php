<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Currency\CurrencyService;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class CurrencyServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(CurrencyService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Register Blade directive for currency formatting
        Blade::directive('currency', function ($expression) {
            return "<?php echo app(\App\Services\Currency\CurrencyService::class)->format({$expression}); ?>";
        });

        // Register Blade directive for currency symbol
        Blade::directive('currencySymbol', function () {
            return "<?php echo app(\App\Services\Currency\CurrencyService::class)->getCurrentSymbol(); ?>";
        });

        // Register Blade directive for currency conversion
        Blade::directive('convert', function ($expression) {
            return "<?php echo app(\App\Services\Currency\CurrencyService::class)->convert({$expression}); ?>";
        });
    }
}
