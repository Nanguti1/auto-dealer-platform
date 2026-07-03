<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\VehicleGallery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GenerateThumbnails implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 180;

    public function __construct(public readonly VehicleGallery $gallery) {}

    public function handle(): void
    {
        try {
            $imagePath = $this->gallery->path;

            if (! $imagePath || ! Storage::disk('public')->exists($imagePath)) {
                Log::warning("Image not found for thumbnail generation: {$this->gallery->id}");

                return;
            }

            $fullPath = Storage::disk('public')->path($imagePath);
            $imageInfo = getimagesize($fullPath);
            if (! $imageInfo) {
                Log::error("Invalid image file for thumbnail generation: {$this->gallery->id}");

                return;
            }

            // Define thumbnail sizes
            $sizes = [
                'small' => [150, 150],
                'medium' => [300, 300],
                'large' => [800, 600],
            ];

            $thumbnails = [];

            foreach ($sizes as $sizeName => [$width, $height]) {
                $thumbnailPath = $this->generateThumbnail($fullPath, $imagePath, $width, $height, $sizeName);
                if ($thumbnailPath) {
                    $thumbnails[$sizeName] = $thumbnailPath;
                }
            }

            // Update gallery with thumbnail paths
            $this->gallery->update([
                'metadata' => array_merge($this->gallery->metadata ?? [], [
                    'thumbnails' => $thumbnails,
                    'thumbnails_generated_at' => now()->toIso8601String(),
                ]),
            ]);

            Log::info("Successfully generated thumbnails for gallery {$this->gallery->id}");
        } catch (\Exception $e) {
            Log::error("Failed to generate thumbnails for gallery {$this->gallery->id}: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function generateThumbnail(string $sourcePath, string $originalPath, int $width, int $height, string $sizeName): ?string
    {
        try {
            $imageInfo = getimagesize($sourcePath);
            if (! $imageInfo) {
                return null;
            }

            // Create image resource based on MIME type
            $image = match ($imageInfo[2]) {
                IMAGETYPE_JPEG => imagecreatefromjpeg($sourcePath),
                IMAGETYPE_PNG => imagecreatefrompng($sourcePath),
                IMAGETYPE_GIF => imagecreatefromgif($sourcePath),
                default => null,
            };

            if (! $image) {
                return null;
            }

            // Calculate aspect ratio
            $originalWidth = $imageInfo[0];
            $originalHeight = $imageInfo[1];
            $aspectRatio = $originalWidth / $originalHeight;

            // Calculate new dimensions maintaining aspect ratio
            if ($width / $height > $aspectRatio) {
                $newWidth = (int) ($height * $aspectRatio);
                $newHeight = $height;
            } else {
                $newWidth = $width;
                $newHeight = (int) ($width / $aspectRatio);
            }

            // Create new image
            $thumbnail = imagecreatetruecolor($newWidth, $newHeight);

            // Handle transparency for PNG/GIF
            if ($imageInfo[2] === IMAGETYPE_PNG || $imageInfo[2] === IMAGETYPE_GIF) {
                imagealphablending($thumbnail, false);
                imagesavealpha($thumbnail, true);
                $transparent = imagecolorallocatealpha($thumbnail, 255, 255, 255, 127);
                imagefilledrectangle($thumbnail, 0, 0, $newWidth, $newHeight, $transparent);
            }

            // Resize image
            imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

            // Generate thumbnail path
            $pathInfo = pathinfo($originalPath);
            $thumbnailPath = $pathInfo['dirname'].'/'.$pathInfo['filename']."_{$sizeName}.".$pathInfo['extension'];
            $fullThumbnailPath = Storage::disk('public')->path($thumbnailPath);

            // Save thumbnail
            $saved = match ($imageInfo[2]) {
                IMAGETYPE_JPEG => imagejpeg($thumbnail, $fullThumbnailPath, 85),
                IMAGETYPE_PNG => imagepng($thumbnail, $fullThumbnailPath, 9),
                IMAGETYPE_GIF => imagegif($thumbnail, $fullThumbnailPath),
                default => false,
            };

            // Clean up
            imagedestroy($image);
            imagedestroy($thumbnail);

            return $saved ? $thumbnailPath : null;
        } catch (\Exception $e) {
            Log::error("Failed to generate {$sizeName} thumbnail: {$e->getMessage()}");

            return null;
        }
    }
}
