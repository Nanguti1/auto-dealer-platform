<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\BodyType;
use App\Models\FuelType;
use App\Models\Make;
use App\Models\Model as VehicleModel;
use App\Models\VehicleCondition;
use Illuminate\Support\Facades\Cache;

class ReferenceDataService
{
    /**
     * Get all makes, cached for 24 hours
     */
    public function getMakes(): array
    {
        return Cache::remember('reference.makes.all', now()->addDay(), function () {
            return Make::orderBy('name')
                ->get()
                ->map(fn ($make) => [
                    'id' => $make->id,
                    'name' => $make->name,
                    'slug' => $make->slug,
                ])
                ->toArray();
        });
    }

    /**
     * Get models by make, cached for 24 hours
     */
    public function getModelsByMake(int $makeId): array
    {
        return Cache::remember("reference.models.make.{$makeId}", now()->addDay(), function () use ($makeId) {
            return VehicleModel::where('make_id', $makeId)
                ->orderBy('name')
                ->get()
                ->map(fn ($model) => [
                    'id' => $model->id,
                    'name' => $model->name,
                    'slug' => $model->slug,
                ])
                ->toArray();
        });
    }

    /**
     * Get all body types, cached for 24 hours
     */
    public function getBodyTypes(): array
    {
        return Cache::remember('reference.bodyTypes.all', now()->addDay(), function () {
            return BodyType::where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn ($bodyType) => [
                    'id' => $bodyType->id,
                    'name' => $bodyType->name,
                    'slug' => $bodyType->slug,
                ])
                ->toArray();
        });
    }

    /**
     * Get all fuel types, cached for 24 hours
     */
    public function getFuelTypes(): array
    {
        return Cache::remember('reference.fuelTypes.all', now()->addDay(), function () {
            return FuelType::where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn ($fuelType) => [
                    'id' => $fuelType->id,
                    'name' => $fuelType->name,
                    'slug' => $fuelType->slug,
                ])
                ->toArray();
        });
    }

    /**
     * Get all vehicle conditions, cached for 24 hours
     */
    public function getVehicleConditions(): array
    {
        return Cache::remember('reference.conditions.all', now()->addDay(), function () {
            return VehicleCondition::orderBy('name')
                ->get()
                ->map(fn ($condition) => [
                    'id' => $condition->id,
                    'name' => $condition->name,
                    'slug' => $condition->slug,
                ])
                ->toArray();
        });
    }

    /**
     * Clear all reference data cache
     */
    public function clearCache(): void
    {
        Cache::forget('reference.makes.all');
        Cache::forget('reference.bodyTypes.all');
        Cache::forget('reference.fuelTypes.all');
        Cache::forget('reference.conditions.all');
        // Clear all model caches
        $makes = Make::all();
        foreach ($makes as $make) {
            Cache::forget("reference.models.make.{$make->id}");
        }
    }
}
