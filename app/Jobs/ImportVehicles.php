<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Vehicle;
use App\Models\VehicleImport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ImportVehicles implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 300;

    public function __construct(public readonly VehicleImport $import) {}

    public function handle(): void
    {
        try {
            $this->import->update(['status' => 'processing']);

            $requestData = $this->import->request_data;
            $vehiclesData = $requestData['vehicles'] ?? [];

            if (empty($vehiclesData)) {
                Log::warning("No vehicles to process for import {$this->import->id}");
                $this->import->update(['status' => 'completed']);

                return;
            }

            $processedCount = 0;
            $failedCount = 0;

            DB::transaction(function () use ($vehiclesData, &$processedCount, &$failedCount) {
                foreach ($vehiclesData as $vehicleData) {
                    try {
                        $this->processVehicle($vehicleData, $this->import);
                        $processedCount++;
                    } catch (\Exception $e) {
                        Log::error("Failed to process vehicle: {$e->getMessage()}");
                        $failedCount++;
                    }
                }
            });

            $this->import->update([
                'status' => 'completed',
                'request_data' => array_merge($requestData, [
                    'processed_count' => $processedCount,
                    'failed_count' => $failedCount,
                    'completed_at' => now()->toIso8601String(),
                ]),
            ]);

            Log::info("Import {$this->import->id} completed: {$processedCount} processed, {$failedCount} failed");
        } catch (\Exception $e) {
            Log::error("Import {$this->import->id} failed: {$e->getMessage()}");
            $this->import->update(['status' => 'failed']);
            $this->release(60);
        }
    }

    private function processVehicle(array $vehicleData, VehicleImport $import): void
    {
        $validator = Validator::make($vehicleData, [
            'make_id' => 'required|exists:makes,id',
            'model_id' => 'required|exists:models,id',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'vin' => 'required|string|unique:vehicles,vin',
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid vehicle data: '.json_encode($validator->errors()));
        }

        Vehicle::create([
            'make_id' => $vehicleData['make_id'],
            'model_id' => $vehicleData['model_id'],
            'year' => $vehicleData['year'],
            'vin' => $vehicleData['vin'],
            'sale_price' => $vehicleData['price'],
            'cost_price' => $vehicleData['cost_price'] ?? $vehicleData['price'] * 0.8,
            'mileage' => $vehicleData['mileage'] ?? 0,
            'title' => $vehicleData['title'] ?? "{$vehicleData['year']} {$vehicleData['make']} {$vehicleData['model']}",
            'slug' => $this->generateSlug($vehicleData),
            'description' => $vehicleData['description'] ?? null,
            'metadata' => array_merge($vehicleData['metadata'] ?? [], [
                'import_id' => $import->id,
                'import_reference' => $import->reference_number,
            ]),
        ]);
    }

    private function generateSlug(array $vehicleData): string
    {
        $base = strtolower(preg_replace('/[^a-z0-9]+/i', '-', trim(
            ($vehicleData['year'] ?? '').' '.
            ($vehicleData['make'] ?? '').' '.
            ($vehicleData['model'] ?? '').' '.
            ($vehicleData['vin'] ?? '')
        )));

        $slug = $base;
        $counter = 1;

        while (Vehicle::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$counter++;
        }

        return $slug;
    }
}
