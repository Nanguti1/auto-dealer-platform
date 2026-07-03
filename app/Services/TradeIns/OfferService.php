<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Models\TradeInOffer;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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
                $q->where('status', 'like', '%'.$filters['search'].'%')
                    ->orWhere('offer_amount', 'like', '%'.$filters['search'].'%');
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
        return DB::transaction(function () use ($offer) {
            $offer->markAsAccepted();

            // Update the associated trade-in request status
            if ($offer->tradeInRequest) {
                $offer->tradeInRequest->markAsOfferAccepted();
            }

            return $offer->fresh();
        });
    }

    public function reject(TradeInOffer $offer): TradeInOffer
    {
        return DB::transaction(function () use ($offer) {
            $offer->markAsRejected();

            // Update the associated trade-in request status
            if ($offer->tradeInRequest) {
                $offer->tradeInRequest->markAsOfferRejected();
            }

            return $offer->fresh();
        });
    }
}
