<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use App\Models\TradeInRequest;
use App\Services\TradeIns\TradeInService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class ApproveTradeInAction
{
    public function __construct(private readonly TradeInService $service) {}

    public function __invoke(TradeInRequest $tradeInRequest): EloquentModel
    {
        return $this->service->update($tradeInRequest, ['status' => 'approved']);
    }
}
