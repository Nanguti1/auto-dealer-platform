<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Models\TradeInValuation;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ValuationService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return TradeInValuation::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = TradeInValuation::query()->with(['tradeInRequest', 'valuationSource']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('valuation_method', 'like', '%'.$filters['search'].'%')
                    ->orWhere('trade_in_value', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['trade_in_request_id'])) {
            $query->where('trade_in_request_id', $filters['trade_in_request_id']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }
}
