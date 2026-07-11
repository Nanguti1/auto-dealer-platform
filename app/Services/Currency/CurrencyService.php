<?php

declare(strict_types=1);

namespace App\Services\Currency;

use App\Models\ExchangeRate;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Stevebauman\Location\Facades\Location;

class CurrencyService
{
    protected string $defaultCurrency;

    protected string $fallbackCurrency;

    protected array $currencies;

    protected array $countryCurrencyMap;

    protected array $sessionKeys;

    protected array $cacheConfig;

    public function __construct()
    {
        $this->defaultCurrency = config('currency.default', 'USD');
        $this->fallbackCurrency = config('currency.fallback', 'USD');
        $this->currencies = config('currency.currencies', []);
        $this->countryCurrencyMap = config('currency.country_currency_map', []);
        $this->sessionKeys = config('currency.session', []);
        $this->cacheConfig = config('currency.cache', []);
    }

    /**
     * Get the current user's currency.
     */
    public function getCurrentCurrency(): string
    {
        // Check if currency is already in session
        if (Session::has($this->sessionKeys['currency'])) {
            return Session::get($this->sessionKeys['currency']);
        }

        // Detect currency from location
        $currency = $this->detectCurrencyFromLocation();

        // Store in session
        $this->setSessionCurrency($currency);

        return $currency;
    }

    /**
     * Get the current currency symbol.
     */
    public function getCurrentSymbol(): string
    {
        // Check if symbol is already in session
        if (Session::has($this->sessionKeys['currency_symbol'])) {
            return Session::get($this->sessionKeys['currency_symbol']);
        }

        $currency = $this->getCurrentCurrency();
        $symbol = $this->getSymbol($currency);

        // Store in session
        Session::put($this->sessionKeys['currency_symbol'], $symbol);

        return $symbol;
    }

    /**
     * Get the current exchange rate.
     */
    public function getCurrentExchangeRate(): float
    {
        // Check if rate is already in session
        if (Session::has($this->sessionKeys['exchange_rate'])) {
            return (float) Session::get($this->sessionKeys['exchange_rate']);
        }

        $currency = $this->getCurrentCurrency();
        $rate = $this->getExchangeRate($this->defaultCurrency, $currency);

        // Store in session
        Session::put($this->sessionKeys['exchange_rate'], $rate);

        return $rate;
    }

    /**
     * Detect currency from user's location.
     */
    protected function detectCurrencyFromLocation(): string
    {
        try {
            $location = Location::get();

            if ($location && $location->countryCode) {
                $countryCode = $location->countryCode;
                Session::put($this->sessionKeys['country'], $countryCode);

                // Map country to currency
                if (isset($this->countryCurrencyMap[$countryCode])) {
                    $currency = $this->countryCurrencyMap[$countryCode];

                    // Check if currency is supported
                    if ($this->isCurrencySupported($currency)) {
                        return $currency;
                    }
                }
            }
        } catch (\Exception $e) {
            // If location detection fails, fall back to default
            \Log::warning('Currency detection from location failed: '.$e->getMessage());
        }

        return $this->fallbackCurrency;
    }

    /**
     * Set currency in session.
     */
    public function setSessionCurrency(string $currency): void
    {
        if (! $this->isCurrencySupported($currency)) {
            $currency = $this->fallbackCurrency;
        }

        Session::put($this->sessionKeys['currency'], $currency);
        Session::put($this->sessionKeys['currency_symbol'], $this->getSymbol($currency));
        Session::put($this->sessionKeys['exchange_rate'], $this->getExchangeRate($this->defaultCurrency, $currency));
    }

    /**
     * Get currency symbol for a given currency code.
     */
    public function getSymbol(string $currency): string
    {
        return $this->currencies[$currency]['symbol'] ?? '$';
    }

    /**
     * Get exchange rate between two currencies.
     */
    public function getExchangeRate(string $from, string $to): float
    {
        // Same currency
        if ($from === $to) {
            return 1.0;
        }

        // Try to get from cache first
        if ($this->cacheConfig['enabled']) {
            $cacheKey = $this->cacheConfig['key'].'_'.$from.'_'.$to;
            $cachedRate = Cache::get($cacheKey);

            if ($cachedRate !== null) {
                return (float) $cachedRate;
            }
        }

        // Try to get from database
        $rate = ExchangeRate::getRate($from, $to);

        if ($rate !== null) {
            // Cache the rate
            if ($this->cacheConfig['enabled']) {
                $cacheKey = $this->cacheConfig['key'].'_'.$from.'_'.$to;
                Cache::put($cacheKey, $rate, $this->cacheConfig['ttl']);
            }

            return $rate;
        }

        // Fallback to 1.0 if rate not found
        return 1.0;
    }

    /**
     * Convert amount from one currency to another.
     */
    public function convert(float $amount, ?string $from = null, ?string $to = null): float
    {
        $from = $from ?? $this->defaultCurrency;
        $to = $to ?? $this->getCurrentCurrency();

        if ($from === $to) {
            return $amount;
        }

        $rate = $this->getExchangeRate($from, $to);

        return $amount * $rate;
    }

    /**
     * Format a price with the current currency.
     */
    public function format(float $amount, ?string $currency = null): string
    {
        $currency = $currency ?? $this->getCurrentCurrency();
        $config = $this->currencies[$currency] ?? $this->currencies[$this->defaultCurrency];

        // Convert to target currency if needed
        $convertedAmount = $this->convert($amount, $this->defaultCurrency, $currency);

        // Format the number
        $formattedNumber = number_format(
            $convertedAmount,
            $config['decimal_places'],
            $config['decimal_separator'],
            $config['thousands_separator']
        );

        // Add symbol
        if ($config['symbol_position'] === 'before') {
            return $config['symbol'].$formattedNumber;
        }

        return $formattedNumber.$config['symbol'];
    }

    /**
     * Format a price with USD currency (for database operations).
     */
    public function formatUSD(float $amount): string
    {
        return $this->format($amount, 'USD');
    }

    /**
     * Check if a currency is supported.
     */
    public function isCurrencySupported(string $currency): bool
    {
        return isset($this->currencies[$currency]);
    }

    /**
     * Get all supported currencies.
     */
    public function getSupportedCurrencies(): array
    {
        return $this->currencies;
    }

    /**
     * Get the default currency.
     */
    public function getDefaultCurrency(): string
    {
        return $this->defaultCurrency;
    }

    /**
     * Get the user's detected country.
     */
    public function getCountry(): ?string
    {
        return Session::get($this->sessionKeys['country']);
    }

    /**
     * Clear currency session data.
     */
    public function clearSession(): void
    {
        Session::forget($this->sessionKeys['country']);
        Session::forget($this->sessionKeys['currency']);
        Session::forget($this->sessionKeys['currency_symbol']);
        Session::forget($this->sessionKeys['exchange_rate']);
    }

    /**
     * Force set a specific currency (useful for user preferences).
     */
    public function setCurrency(string $currency): void
    {
        if ($this->isCurrencySupported($currency)) {
            $this->setSessionCurrency($currency);
        }
    }
}
