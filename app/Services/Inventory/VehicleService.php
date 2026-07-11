<?php

declare(strict_types=1);

namespace App\Services\Inventory;

use App\Events\VehicleSold;
use App\Exceptions\VehicleAlreadySoldException;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleGallery;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
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

    public function markSold(Vehicle $vehicle, ?User $buyer = null): Vehicle
    {
        if ($vehicle->sold_at !== null) {
            throw new VehicleAlreadySoldException('This vehicle has already been marked as sold.');
        }

        $data = ['sold_at' => now(), 'is_featured' => false];
        if ($buyer) {
            $data['assigned_user_id'] = $buyer->id;
        }

        $vehicle = $this->update($vehicle, $data);

        event(new VehicleSold($vehicle));

        return $vehicle;
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
        // Filter out non-integer values and ensure all values are valid integers
        $validFeatureIds = array_filter($featureIds, fn ($id) => is_numeric($id) && $id > 0);
        $validFeatureIds = array_map('intval', $validFeatureIds);

        DB::transaction(fn (): array => $vehicle->features()->sync($validFeatureIds));

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

    /**
     * Handle media uploads for a vehicle.
     *
     * @param  array<int, UploadedFile>  $mediaFiles
     */
    public function handleMediaUploads(Vehicle $vehicle, array $mediaFiles): Vehicle
    {
        if (empty($mediaFiles)) {
            return $vehicle;
        }

        return DB::transaction(function () use ($vehicle, $mediaFiles): Vehicle {
            $galleryItems = [];

            foreach ($mediaFiles as $index => $file) {
                $path = $file->store('vehicles/'.$vehicle->id, 'public');

                $galleryItems[] = [
                    'vehicle_id' => $vehicle->id,
                    'path' => $path,
                    'alt_text' => $file->getClientOriginalName(),
                    'is_primary' => $index === 0 && $vehicle->galleries()->count() === 0,
                    'sort_order' => $vehicle->galleries()->count() + $index,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if (! empty($galleryItems)) {
                VehicleGallery::insert($galleryItems);
            }

            return $vehicle->refresh();
        });
    }
}
