<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\VehicleGallery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessVehicleImages implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 120;

    public function __construct(public readonly VehicleGallery $gallery) {}

    public function handle(): void
    {
        try {
            $imagePath = $this->gallery->path;

            if (! $imagePath || ! Storage::disk('public')->exists($imagePath)) {
                Log::warning("Image not found for gallery {$this->gallery->id}: {$imagePath}");

                return;
            }

            // Get image dimensions and validate
            $fullPath = Storage::disk('public')->path($imagePath);
            $imageInfo = getimagesize($fullPath);
            if (! $imageInfo) {
                Log::error("Invalid image file for gallery {$this->gallery->id}");

                return;
            }

            // Update gallery with image metadata
            $this->gallery->update([
                'metadata' => array_merge($this->gallery->metadata ?? [], [
                    'width' => $imageInfo[0],
                    'height' => $imageInfo[1],
                    'mime_type' => $imageInfo['mime'],
                    'processed_at' => now()->toIso8601String(),
                ]),
            ]);

            Log::info("Successfully processed image for gallery {$this->gallery->id}");
        } catch (\Exception $e) {
            Log::error("Failed to process image for gallery {$this->gallery->id}: {$e->getMessage()}");
            $this->release(30);
        }
    }
}
