<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

class ConfigurationService
{
    /**
     * Get a configuration value with caching
     * Configuration values are cached for 1 hour
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return Cache::tags(['config'])->remember("config.{$key}", now()->addHour(), function () use ($key, $default) {
            return Config::get($key, $default);
        });
    }

    /**
     * Get application name, cached for 1 hour
     */
    public function getAppName(): string
    {
        return $this->get('app.name', 'Laravel');
    }

    /**
     * Get application URL, cached for 1 hour
     */
    public function getAppUrl(): string
    {
        return $this->get('app.url', '');
    }

    /**
     * Get application environment, cached for 1 hour
     */
    public function getAppEnv(): string
    {
        return $this->get('app.env', 'production');
    }

    /**
     * Check if application is in debug mode, cached for 1 hour
     */
    public function isDebug(): bool
    {
        return (bool) $this->get('app.debug', false);
    }

    /**
     * Get timezone, cached for 1 hour
     */
    public function getTimezone(): string
    {
        return $this->get('app.timezone', 'UTC');
    }

    /**
     * Get locale, cached for 1 hour
     */
    public function getLocale(): string
    {
        return $this->get('app.locale', 'en');
    }

    /**
     * Clear all configuration cache
     */
    public function clearCache(): void
    {
        Cache::tags(['config'])->flush();
    }
}
