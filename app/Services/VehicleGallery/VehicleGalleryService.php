<?php

declare(strict_types=1);

namespace App\Services\VehicleGallery;

use App\Jobs\GenerateThumbnails;
use App\Jobs\ProcessVehicleImages;
use App\Models\VehicleGallery;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

class VehicleGalleryService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleGallery::class;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): VehicleGallery
    {
        $gallery = $this->createModel($data);

        // Dispatch image processing jobs asynchronously
        Bus::chain([
            new ProcessVehicleImages($gallery),
            new GenerateThumbnails($gallery),
        ])->dispatch();

        return $gallery;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    protected function createModel(array $data): VehicleGallery
    {
        return DB::transaction(fn (): VehicleGallery => VehicleGallery::query()->create($data));
    }
}
