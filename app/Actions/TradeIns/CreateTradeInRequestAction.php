<?php

declare(strict_types=1);

namespace App\Actions\TradeIns;

use App\Services\TradeIns\TradeInService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateTradeInRequestAction
{
    public function __construct(private readonly TradeInService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
