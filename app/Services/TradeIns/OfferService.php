<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Models\TradeInOffer;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class OfferService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return TradeInOffer::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = TradeInOffer::query()->with(['tradeInRequest', 'valuation', 'createdBy']);

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

    public function accept(TradeInOffer $offer): TradeInOffer
    {
        $offer->update([
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);

        return $offer->fresh();
    }

    public function reject(TradeInOffer $offer): TradeInOffer
    {
        $offer->update([
            'status' => 'rejected',
            'rejected_at' => now(),
        ]);

        return $offer->fresh();
    }
}
