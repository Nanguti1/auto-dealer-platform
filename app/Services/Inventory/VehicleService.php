<?php

declare(strict_types=1);

namespace App\Services\Inventory;

use App\Models\Vehicle;
use App\Services\Concerns\ManagesEloquentModels;
use App\Exceptions\VehicleAlreadySoldException;
use Illuminate\Support\Facades\DB;

class VehicleService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Vehicle::class;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function feature(Vehicle $vehicle, array $data = []): Vehicle
    {
        return $this->update($vehicle, ['is_featured' => true] + $data);
    }

    public function unfeature(Vehicle $vehicle): Vehicle
    {
        return $this->update($vehicle, ['is_featured' => false]);
    }

    public function publish(Vehicle $vehicle): Vehicle
    {
        return $this->update($vehicle, ['listed_at' => now()]);
    }

    public function archive(Vehicle $vehicle): void
    {
        $this->delete($vehicle);
    }

    public function markSold(Vehicle $vehicle): Vehicle
    {
        if ($vehicle->sold_at !== null) {
            throw new VehicleAlreadySoldException('This vehicle has already been marked as sold.');
        }

        return $this->update($vehicle, ['sold_at' => now(), 'is_featured' => false]);
    }

    public function duplicate(Vehicle $vehicle): Vehicle
    {
        return DB::transaction(function () use ($vehicle): Vehicle {
            $copy = $vehicle->replicate(['stock_number', 'vin', 'slug', 'sold_at']);
            $copy->stock_number = $vehicle->stock_number.'-COPY-'.now()->format('YmdHis');
            $copy->vin = $vehicle->vin.'COPY';
            $copy->slug = $vehicle->slug.'-copy-'.now()->format('YmdHis');
            $copy->listed_at = null;
            $copy->sold_at = null;
            $copy->save();

            return $copy;
        });
    }

    /** @param array<int, int> $featureIds */
    public function syncFeatures(Vehicle $vehicle, array $featureIds): Vehicle
    {
        DB::transaction(fn (): array => $vehicle->features()->sync($featureIds));

        return $vehicle->refresh();
    }

    /** @param array<int, array<string, mixed>> $galleryItems */
    public function syncGallery(Vehicle $vehicle, array $galleryItems): Vehicle
    {
        return DB::transaction(function () use ($vehicle, $galleryItems): Vehicle {
            $vehicle->galleries()->delete();
            $vehicle->galleries()->createMany($galleryItems);

            return $vehicle->refresh();
        });
    }

    /** @param array<int, array<string, mixed>> $specifications */
    public function syncSpecifications(Vehicle $vehicle, array $specifications): Vehicle
    {
        return DB::transaction(function () use ($vehicle, $specifications): Vehicle {
            $vehicle->specifications()->delete();
            $vehicle->specifications()->createMany($specifications);

            return $vehicle->refresh();
        });
    }

    /** @param array<int, string> $tags */
    public function syncTags(Vehicle $vehicle, array $tags): Vehicle
    {
        return $this->update($vehicle, ['metadata' => array_merge($vehicle->metadata ?? [], ['tags' => $tags])]);
    }
}
