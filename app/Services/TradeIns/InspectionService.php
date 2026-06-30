<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Models\TradeInInspection;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class InspectionService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return TradeInInspection::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = TradeInInspection::query()->with(['tradeInRequest', 'inspector']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('status', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['trade_in_request_id'])) {
            $query->where('trade_in_request_id', $filters['trade_in_request_id']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function complete(TradeInInspection $inspection): TradeInInspection
    {
        $inspection->update([
            'status' => 'completed',
        ]);

        return $inspection->fresh();
    }
}
