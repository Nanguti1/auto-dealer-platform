<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\BlogPost;
use App\Models\Vehicle;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncSearchIndex implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 120;

    public function __construct(
        public readonly string $indexableType,
        public readonly int $indexableId,
        public readonly string $action = 'update'
    ) {}

    public function handle(): void
    {
        try {
            $model = match ($this->indexableType) {
                'Vehicle' => Vehicle::find($this->indexableId),
                'BlogPost' => BlogPost::find($this->indexableId),
                default => throw new \InvalidArgumentException("Unknown indexable type: {$this->indexableType}"),
            };

            if (! $model) {
                Log::warning("Model not found for search index sync: {$this->indexableType} {$this->indexableId}");

                return;
            }

            // In a real implementation, this would sync with a search engine like Algolia, Meilisearch, or Elasticsearch
            // For now, we'll just log the action
            $searchData = $this->prepareSearchData($model);

            Log::info("Search index sync: {$this->action} {$this->indexableType} {$this->indexableId}", [
                'action' => $this->action,
                'data' => $searchData,
            ]);

            // Example integration (commented out):
            // if ($this->action === 'delete') {
            //     SearchIndex::delete($this->indexableType, $this->indexableId);
            // } else {
            //     SearchIndex::upsert($this->indexableType, $this->indexableId, $searchData);
            // }
        } catch (\Exception $e) {
            Log::error("Search index sync failed: {$e->getMessage()}");
            $this->release(30);
        }
    }

    private function prepareSearchData(object $model): array
    {
        return match ($this->indexableType) {
            'Vehicle' => [
                'id' => $model->id,
                'title' => $model->title,
                'make' => $model->make->name ?? null,
                'model' => $model->vehicleModel->name ?? null,
                'year' => $model->year,
                'price' => $model->sale_price,
                'mileage' => $model->mileage,
                'description' => $model->description,
                'status' => $model->inventoryStatus->name ?? null,
            ],
            'BlogPost' => [
                'id' => $model->id,
                'title' => $model->title,
                'content' => $model->content,
                'excerpt' => $model->excerpt,
                'author' => $model->author->name ?? null,
                'published_at' => $model->published_at?->toIso8601String(),
                'status' => $model->status,
            ],
            default => [],
        };
    }
}
