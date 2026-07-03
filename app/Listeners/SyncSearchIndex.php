<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\BlogPublished;
use App\Events\VehicleCreated;
use App\Events\VehicleDeleted;
use App\Events\VehicleUpdated;
use App\Jobs\SyncSearchIndex as SyncSearchIndexJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SyncSearchIndex implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $eventClass = get_class($event);

            match ($eventClass) {
                VehicleCreated::class => $this->handleVehicleCreated($event),
                VehicleUpdated::class => $this->handleVehicleUpdated($event),
                VehicleDeleted::class => $this->handleVehicleDeleted($event),
                BlogPublished::class => $this->handleBlogPublished($event),
                default => Log::info("No search index handler for event: {$eventClass}"),
            };
        } catch (\Exception $e) {
            Log::error("Failed to sync search index: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function handleVehicleCreated(VehicleCreated $event): void
    {
        SyncSearchIndexJob::dispatch('Vehicle', $event->vehicle->id, 'update');
        Log::info("Queued search index sync for vehicle created: {$event->vehicle->id}");
    }

    private function handleVehicleUpdated(VehicleUpdated $event): void
    {
        SyncSearchIndexJob::dispatch('Vehicle', $event->vehicle->id, 'update');
        Log::info("Queued search index sync for vehicle updated: {$event->vehicle->id}");
    }

    private function handleVehicleDeleted(VehicleDeleted $event): void
    {
        SyncSearchIndexJob::dispatch('Vehicle', $event->vehicle->id, 'delete');
        Log::info("Queued search index sync for vehicle deleted: {$event->vehicle->id}");
    }

    private function handleBlogPublished(BlogPublished $event): void
    {
        SyncSearchIndexJob::dispatch('BlogPost', $event->blogPost->id, 'update');
        Log::info("Queued search index sync for blog published: {$event->blogPost->id}");
    }
}
