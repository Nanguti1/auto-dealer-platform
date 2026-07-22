<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\JpegEncoder;
use Intervention\Image\Encoders\PngEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;

#[Signature('app:optimize-images')]
#[Description('Optimize existing uploaded images in storage and public/images to reduce storage and bandwidth usage')]
class OptimizeImages extends Command
{
    /**
     * Target directories to scan for images.
     * Storage disk directories and public directory.
     */
    private array $targetDirectories = [
        'demo-cars',
        'hero-sliders',
        'media',
        'promotions',
        'vehicles',
    ];

    /**
     * Public directory to scan for static images.
     */
    private string $publicImagesDirectory = 'images';

    /**
     * Supported image extensions.
     */
    private array $supportedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

    /**
     * Minimum file size in bytes (150 KB).
     */
    private int $minFileSize = 150 * 1024; // 150 KB

    /**
     * Maximum width for standard images (1600px).
     */
    private int $standardMaxWidth = 1600;

    /**
     * Maximum dimensions for hero images (1920x1200).
     */
    private int $heroMaxWidth = 1920;

    private int $heroMaxHeight = 1200;

    /**
     * JPEG quality for compression.
     */
    private int $jpegQuality = 80;

    /**
     * WebP quality for compression.
     */
    private int $webpQuality = 80;

    /**
     * Statistics tracking.
     */
    private int $imagesScanned = 0;

    private int $imagesOptimized = 0;

    private int $imagesSkipped = 0;

    private int $originalTotalSize = 0;

    private int $optimizedTotalSize = 0;

    private int $totalSpaceSaved = 0;

    /**
     * Get maximum dimensions based on directory type.
     */
    private function getMaxDimensions(string $filePath): array
    {
        // Hero-specific directories
        $heroDirectories = [
            'hero-sliders',
            'public/images/hero',
        ];

        foreach ($heroDirectories as $heroDir) {
            if (str_contains($filePath, $heroDir)) {
                return [
                    'width' => $this->heroMaxWidth,
                    'height' => $this->heroMaxHeight,
                ];
            }
        }

        // Standard dimensions for other directories
        return [
            'width' => $this->standardMaxWidth,
            'height' => null,
        ];
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Starting image optimization...');
        $this->newLine();

        // Initialize ImageManager with GD driver
        $manager = new ImageManager(new Driver);

        // Get the public disk
        $disk = Storage::disk('public');

        foreach ($this->targetDirectories as $directory) {
            $this->info("Scanning: {$directory}/");
            $this->newLine();

            // Get all files in the directory recursively
            $files = $disk->allFiles($directory);

            foreach ($files as $file) {
                $this->processFile($disk, $manager, $file);
            }
        }

        // Process public/images directory
        $this->info("Scanning: public/{$this->publicImagesDirectory}/");
        $this->newLine();

        $publicPath = public_path($this->publicImagesDirectory);

        if (File::exists($publicPath)) {
            $files = File::allFiles($publicPath);

            foreach ($files as $file) {
                $relativePath = str_replace($publicPath.'\\', '', $file->getPathname());
                $relativePath = str_replace($publicPath.'/', '', $relativePath);
                $this->processPublicFile($manager, $file->getPathname(), $relativePath);
            }
        } else {
            $this->line("  Directory not found: public/{$this->publicImagesDirectory}");
            $this->newLine();
        }

        // Print summary
        $this->printSummary();

        return Command::SUCCESS;
    }

    /**
     * Process a single file.
     */
    private function processFile($disk, ImageManager $manager, string $filePath): void
    {
        $this->imagesScanned++;

        // Get file extension
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

        // Skip unsupported file types
        if (! in_array($extension, $this->supportedExtensions)) {
            return;
        }

        try {
            // Get file size
            $fileSize = $disk->size($filePath);

            // Skip files already under 150 KB
            if ($fileSize < $this->minFileSize) {
                $this->line("  Skipped: {$filePath}");
                $this->line('Reason: Already under 150 KB');
                $this->newLine();
                $this->imagesSkipped++;

                return;
            }

            // Get the full file path
            $fullPath = $disk->path($filePath);

            // Create image instance from file path using v4 API
            $image = $manager->decodePath($fullPath);

            // Get original dimensions
            $originalWidth = $image->width();
            $originalHeight = $image->height();

            // Get max dimensions based on directory type
            $maxDimensions = $this->getMaxDimensions($filePath);

            // Resize based on directory type
            if ($maxDimensions['height'] !== null) {
                // Hero images: resize if larger than 1920x1200
                if ($originalWidth > $maxDimensions['width'] || $originalHeight > $maxDimensions['height']) {
                    $image->scaleDown($maxDimensions['width'], $maxDimensions['height']);
                }
            } else {
                // Standard images: resize if wider than 1600px
                if ($originalWidth > $maxDimensions['width']) {
                    $image->scaleDown($maxDimensions['width']);
                }
            }

            // Determine encoder based on file type
            $encoder = null;

            match ($extension) {
                'jpg', 'jpeg' => $encoder = new JpegEncoder($this->jpegQuality),
                'webp' => $encoder = new WebpEncoder($this->webpQuality),
                'png' => $encoder = new PngEncoder,
                default => null,
            };

            if ($encoder === null) {
                return;
            }

            // Encode the image
            $encodedImage = $image->encode($encoder);

            // Get optimized file size
            $optimizedSize = strlen($encodedImage);

            // Only overwrite if the optimized version is smaller
            if ($optimizedSize < $fileSize) {
                // Store original size for statistics
                $this->originalTotalSize += $fileSize;
                $this->optimizedTotalSize += $optimizedSize;
                $this->totalSpaceSaved += ($fileSize - $optimizedSize);

                // Overwrite the original file
                $disk->put($filePath, $encodedImage);

                $spaceSaved = $this->formatBytes($fileSize - $optimizedSize);
                $this->line("  ✓ {$filePath}");
                $this->line("  Saved: {$spaceSaved}");
                $this->newLine();
                $this->imagesOptimized++;
            } else {
                $this->line("  Skipped: {$filePath}");
                $this->line('Reason: Optimized version was not smaller');
                $this->newLine();
                $this->imagesSkipped++;
            }
        } catch (\Exception $e) {
            $this->error("  Error processing: {$filePath}");
            $this->error("  Message: {$e->getMessage()}");
            $this->newLine();
        }
    }

    /**
     * Process a single file from public directory.
     */
    private function processPublicFile(ImageManager $manager, string $fullPath, string $relativePath): void
    {
        $this->imagesScanned++;

        // Construct the file path for dimension detection
        $filePath = "public/{$this->publicImagesDirectory}/{$relativePath}";

        // Get file extension
        $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));

        // Skip unsupported file types
        if (! in_array($extension, $this->supportedExtensions)) {
            return;
        }

        try {
            // Get file size
            $fileSize = filesize($fullPath);

            // Skip files already under 150 KB
            if ($fileSize < $this->minFileSize) {
                $this->line("  Skipped: {$filePath}");
                $this->line('Reason: Already under 150 KB');
                $this->newLine();
                $this->imagesSkipped++;

                return;
            }

            // Create image instance from file path using v4 API
            $image = $manager->decodePath($fullPath);

            // Get original dimensions
            $originalWidth = $image->width();
            $originalHeight = $image->height();

            // Get max dimensions based on directory type
            $maxDimensions = $this->getMaxDimensions($filePath);

            // Resize based on directory type
            if ($maxDimensions['height'] !== null) {
                // Hero images: resize if larger than 1920x1200
                if ($originalWidth > $maxDimensions['width'] || $originalHeight > $maxDimensions['height']) {
                    $image->scaleDown($maxDimensions['width'], $maxDimensions['height']);
                }
            } else {
                // Standard images: resize if wider than 1600px
                if ($originalWidth > $maxDimensions['width']) {
                    $image->scaleDown($maxDimensions['width']);
                }
            }

            // Determine encoder based on file type
            $encoder = null;

            match ($extension) {
                'jpg', 'jpeg' => $encoder = new JpegEncoder($this->jpegQuality),
                'webp' => $encoder = new WebpEncoder($this->webpQuality),
                'png' => $encoder = new PngEncoder,
                default => null,
            };

            if ($encoder === null) {
                return;
            }

            // Encode the image
            $encodedImage = $image->encode($encoder);

            // Get optimized file size
            $optimizedSize = strlen($encodedImage);

            // Only overwrite if the optimized version is smaller
            if ($optimizedSize < $fileSize) {
                // Store original size for statistics
                $this->originalTotalSize += $fileSize;
                $this->optimizedTotalSize += $optimizedSize;
                $this->totalSpaceSaved += ($fileSize - $optimizedSize);

                // Overwrite the original file
                file_put_contents($fullPath, $encodedImage);

                $spaceSaved = $this->formatBytes($fileSize - $optimizedSize);
                $this->line("  ✓ {$filePath}");
                $this->line("  Saved: {$spaceSaved}");
                $this->newLine();
                $this->imagesOptimized++;
            } else {
                $this->line("  Skipped: {$filePath}");
                $this->line('Reason: Optimized version was not smaller');
                $this->newLine();
                $this->imagesSkipped++;
            }
        } catch (\Exception $e) {
            $this->error("  Error processing: {$filePath}");
            $this->error("  Message: {$e->getMessage()}");
            $this->newLine();
        }
    }

    /**
     * Print optimization summary.
     */
    private function printSummary(): void
    {
        $this->newLine();
        $this->info('=== Optimization Summary ===');
        $this->newLine();

        $this->line("Images scanned: {$this->imagesScanned}");
        $this->line("Optimized: {$this->imagesOptimized}");
        $this->line("Skipped: {$this->imagesSkipped}");
        $this->newLine();

        $originalSize = $this->formatBytes($this->originalTotalSize);
        $optimizedSize = $this->formatBytes($this->optimizedTotalSize);
        $spaceSaved = $this->formatBytes($this->totalSpaceSaved);

        $this->line("Original size: {$originalSize}");
        $this->line("Optimized size: {$optimizedSize}");
        $this->newLine();

        $this->line("Space saved: {$spaceSaved}");

        // Calculate percentage reduction
        if ($this->originalTotalSize > 0) {
            $reduction = (($this->totalSpaceSaved / $this->originalTotalSize) * 100);
            $this->line('Reduction: '.number_format($reduction, 1).'%');
        }

        $this->newLine();
        $this->info('Image optimization completed!');
    }

    /**
     * Format bytes to human-readable format.
     */
    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 1).' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 1).' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 1).' KB';
        } elseif ($bytes > 0) {
            return $bytes.' bytes';
        }

        return '0 bytes';
    }
}
