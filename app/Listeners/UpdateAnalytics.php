<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\BlogPublished;
use App\Events\PromotionCreated;
use App\Events\VehicleSold;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class UpdateAnalytics implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $eventClass = get_class($event);

            $analyticsData = match ($eventClass) {
                VehicleSold::class => $this->handleVehicleSold($event),
                BlogPublished::class => $this->handleBlogPublished($event),
                PromotionCreated::class => $this->handlePromotionCreated($event),
                default => null,
            };

            if ($analyticsData) {
                Log::info('Analytics Updated', $analyticsData);

                // Store in analytics database/table if it exists
                // DB::table('analytics_events')->insert([
                //     'event_type' => $eventClass,
                //     'data' => json_encode($analyticsData),
                //     'created_at' => now(),
                // ]);
            }
        } catch (\Exception $e) {
            Log::error("Failed to update analytics: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function handleVehicleSold(VehicleSold $event): array
    {
        return [
            'event_type' => 'vehicle_sold',
            'vehicle_id' => $event->vehicle->id,
            'vehicle_vin' => $event->vehicle->vin,
            'sale_price' => $event->vehicle->sale_price,
            'sold_at' => $event->vehicle->sold_at?->toIso8601String(),
            'make' => $event->vehicle->make->name ?? null,
            'model' => $event->vehicle->vehicleModel->name ?? null,
        ];
    }

    private function handleBlogPublished(BlogPublished $event): array
    {
        return [
            'event_type' => 'blog_published',
            'blog_post_id' => $event->blogPost->id,
            'title' => $event->blogPost->title,
            'published_at' => $event->blogPost->published_at?->toIso8601String(),
            'author_id' => $event->blogPost->author_id,
        ];
    }

    private function handlePromotionCreated(PromotionCreated $event): array
    {
        return [
            'event_type' => 'promotion_created',
            'promotion_id' => $event->promotion->id,
            'title' => $event->promotion->title,
            'discount_type' => $event->promotion->discount_type,
            'discount_value' => $event->promotion->discount_value,
            'created_at' => $event->promotion->created_at->toIso8601String(),
        ];
    }
}
