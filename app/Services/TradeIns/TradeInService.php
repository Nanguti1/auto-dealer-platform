<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Actions\TradeIns\ApproveTradeInAction;
use App\Actions\TradeIns\RejectTradeInAction;
use App\Models\TradeInRequest;
use App\Models\Vehicle;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TradeInService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return TradeInRequest::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = TradeInRequest::query()->with(['user', 'vehicle', 'valuations', 'inspections', 'offers']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('make', 'like', '%'.$filters['search'].'%')
                    ->orWhere('model', 'like', '%'.$filters['search'].'%')
                    ->orWhere('vin', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function approve(TradeInRequest $tradeInRequest): TradeInRequest
    {
        return DB::transaction(function () use ($tradeInRequest) {
            $action = new ApproveTradeInAction;

            return $action->execute($tradeInRequest);
        });
    }

    public function reject(TradeInRequest $tradeInRequest): TradeInRequest
    {
        return DB::transaction(function () use ($tradeInRequest) {
            $action = new RejectTradeInAction;

            return $action->execute($tradeInRequest);
        });
    }

    public function convertToInventory(TradeInRequest $tradeInRequest): TradeInRequest
    {
        return DB::transaction(function () use ($tradeInRequest) {
            // Create a vehicle record from the trade-in request
            $vehicle = Vehicle::create([
                'make' => $tradeInRequest->make,
                'model' => $tradeInRequest->model,
                'year' => $tradeInRequest->year,
                'vin' => $tradeInRequest->vin,
                'mileage' => $tradeInRequest->mileage,
                'sale_price' => $tradeInRequest->offered_value ?? $tradeInRequest->estimated_value,
                'status' => 'available',
                'inventory_status' => 'in_stock',
            ]);

            // Update the trade-in request status
            $tradeInRequest->update([
                'vehicle_id' => $vehicle->id,
                'status' => 'completed',
            ]);

            return $tradeInRequest->fresh();
        });
    }
}
