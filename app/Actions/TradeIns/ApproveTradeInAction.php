<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use App\Events\TradeInApproved;
use App\Models\TradeInRequest;
use App\Services\TradeIns\TradeInService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class ApproveTradeInAction
{
    public function __construct(private readonly TradeInService $service) {}

    public function __invoke(TradeInRequest $tradeInRequest): EloquentModel
    {
        $tradeInRequest = $this->service->update($tradeInRequest, ['status' => 'approved']);

        event(new TradeInApproved($tradeInRequest));

        return $tradeInRequest;
    }

    public function execute(TradeInRequest $tradeInRequest): EloquentModel
    {
        return $this($tradeInRequest);
    }
}
