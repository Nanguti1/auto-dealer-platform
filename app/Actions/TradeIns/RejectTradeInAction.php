<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\TradeInRequest;
use App\Services\TradeIns\TradeInService;

class RejectTradeInAction
{
    public function __construct(private readonly TradeInService $service)
    {
    }

    public function __invoke(TradeInRequest $tradeInRequest): EloquentModel
    {
        return $this->service->update($tradeInRequest, ['status' => 'rejected']);
    }
}
