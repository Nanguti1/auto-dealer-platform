<?php

declare(strict_types=1);

namespace App\Services\Settings;

use App\Models\Setting;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Support\Facades\Cache;

class SettingService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Setting::class;
    }

    /**
     * Get all settings grouped by group, cached for 1 hour
     */
    public function getAllGrouped(): array
    {
        return Cache::tags(['settings'])->remember('settings.all.grouped', now()->addHours(1), function () {
            return Setting::all()
                ->groupBy('group')
                ->map(fn ($group) => $group->pluck('value', 'key'))
                ->toArray();
        });
    }

    /**
     * Get settings by group, cached for 1 hour
     */
    public function getByGroup(string $group): array
    {
        return Cache::tags(['settings'])->remember("settings.group.{$group}", now()->addHours(1), function () use ($group) {
            return Setting::where('group', $group)
                ->pluck('value', 'key')
                ->toArray();
        });
    }

    /**
     * Get a single setting value, cached for 1 hour
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return Cache::tags(['settings'])->remember("settings.key.{$key}", now()->addHours(1), function () use ($key, $default) {
            $setting = Setting::where('key', $key)->first();

            return $setting?->value ?? $default;
        });
    }
}
