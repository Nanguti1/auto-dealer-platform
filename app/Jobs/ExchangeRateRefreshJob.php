<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\ExchangeRate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExchangeRateRefreshJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $provider = config('currency.exchange_rate_provider', 'exchangerate_api');

        try {
            switch ($provider) {
                case 'exchangerate_api':
                    $this->fetchFromExchangeRateAPI();
                    break;
                case 'fixer':
                    $this->fetchFromFixer();
                    break;
                case 'openexchangerates':
                    $this->fetchFromOpenExchangeRates();
                    break;
                case 'mock':
                    $this->fetchMockRates();
                    break;
                default:
                    Log::error("Unknown exchange rate provider: {$provider}");
            }
        } catch (\Exception $e) {
            Log::error('Failed to refresh exchange rates: '.$e->getMessage());
            throw $e;
        }
    }

    /**
     * Fetch rates from exchangerate-api.com (free tier).
     */
    protected function fetchFromExchangeRateAPI(): void
    {
        $baseCurrency = config('currency.default', 'USD');
        $url = "https://api.exchangerate-api.com/v4/latest/{$baseCurrency}";

        $response = Http::timeout(30)->get($url);

        if (! $response->successful()) {
            throw new \RuntimeException('Failed to fetch exchange rates from ExchangeRate API');
        }

        $data = $response->json();

        if (! isset($data['rates'])) {
            throw new \RuntimeException('Invalid response format from ExchangeRate API');
        }

        $this->storeRates($baseCurrency, $data['rates']);
    }

    /**
     * Fetch rates from Fixer.io (requires API key).
     */
    protected function fetchFromFixer(): void
    {
        $apiKey = config('currency.api_keys.fixer');

        if (! $apiKey) {
            throw new \RuntimeException('Fixer API key is not configured');
        }

        $baseCurrency = config('currency.default', 'USD');
        $url = "http://data.fixer.io/api/latest?access_key={$apiKey}&base={$baseCurrency}";

        $response = Http::timeout(30)->get($url);

        if (! $response->successful()) {
            throw new \RuntimeException('Failed to fetch exchange rates from Fixer');
        }

        $data = $response->json();

        if (! isset($data['rates'])) {
            throw new \RuntimeException('Invalid response format from Fixer');
        }

        $this->storeRates($baseCurrency, $data['rates']);
    }

    /**
     * Fetch rates from OpenExchangeRates (requires API key).
     */
    protected function fetchFromOpenExchangeRates(): void
    {
        $apiKey = config('currency.api_keys.openexchangerates');

        if (! $apiKey) {
            throw new \RuntimeException('OpenExchangeRates API key is not configured');
        }

        $baseCurrency = config('currency.default', 'USD');
        $url = "https://openexchangerates.org/api/latest.json?app_id={$apiKey}&base={$baseCurrency}";

        $response = Http::timeout(30)->get($url);

        if (! $response->successful()) {
            throw new \RuntimeException('Failed to fetch exchange rates from OpenExchangeRates');
        }

        $data = $response->json();

        if (! isset($data['rates'])) {
            throw new \RuntimeException('Invalid response format from OpenExchangeRates');
        }

        $this->storeRates($baseCurrency, $data['rates']);
    }

    /**
     * Fetch mock rates for testing.
     */
    protected function fetchMockRates(): void
    {
        $baseCurrency = config('currency.default', 'USD');
        $currencies = config('currency.currencies', []);

        $rates = [];
        foreach ($currencies as $code => $config) {
            if ($code !== $baseCurrency) {
                // Use realistic mock rates
                $rates[$code] = $this->getMockRate($code);
            }
        }

        $this->storeRates($baseCurrency, $rates);
    }

    /**
     * Get mock exchange rate for testing.
     */
    protected function getMockRate(string $currency): float
    {
        $mockRates = [
            'KES' => 129.5,
            'UGX' => 3750.0,
            'TZS' => 2500.0,
            'GBP' => 0.79,
            'EUR' => 0.92,
            'ZAR' => 18.5,
            'NGN' => 1550.0,
            'GHS' => 12.5,
            'EGP' => 48.5,
            'RWF' => 1250.0,
            'BWP' => 13.5,
            'NAD' => 18.5,
            'ZMW' => 25.5,
            'MZN' => 63.5,
            'AOA' => 850.0,
            'XAF' => 600.0,
            'XOF' => 600.0,
            'CAD' => 1.35,
            'AUD' => 1.55,
            'JPY' => 150.0,
            'CNY' => 7.2,
            'INR' => 83.5,
            'AED' => 3.67,
            'SAR' => 3.75,
        ];

        return $mockRates[$currency] ?? 1.0;
    }

    /**
     * Store exchange rates in database and cache.
     */
    protected function storeRates(string $baseCurrency, array $rates): void
    {
        $supportedCurrencies = array_keys(config('currency.currencies', []));

        foreach ($rates as $currency => $rate) {
            // Only store rates for supported currencies
            if (in_array($currency, $supportedCurrencies, true)) {
                ExchangeRate::updateOrCreateRate($baseCurrency, $currency, (float) $rate);

                // Clear cache for this currency pair
                $cacheKey = config('currency.cache.key').'_'.$baseCurrency.'_'.$currency;
                Cache::forget($cacheKey);
            }
        }

        Log::info('Exchange rates refreshed successfully', [
            'base_currency' => $baseCurrency,
            'rates_count' => count($rates),
        ]);
    }
}
