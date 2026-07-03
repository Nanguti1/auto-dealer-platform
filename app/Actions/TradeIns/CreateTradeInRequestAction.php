<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use App\Events\TradeInSubmitted;
use App\Services\TradeIns\TradeInService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateTradeInRequestAction
{
    public function __construct(private readonly TradeInService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        $tradeInRequest = $this->service->create($data);

        event(new TradeInSubmitted($tradeInRequest));

        return $tradeInRequest;
    }
}
