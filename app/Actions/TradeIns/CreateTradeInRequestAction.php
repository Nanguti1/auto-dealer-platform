<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Services\TradeIns\TradeInService;

class CreateTradeInRequestAction
{
    public function __construct(private readonly TradeInService $service)
    {
    }

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
