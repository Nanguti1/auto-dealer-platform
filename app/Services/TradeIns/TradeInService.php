<?php

declare(strict_types=1);

namespace App\Services\TradeIns;

use App\Models\TradeInRequest;
use App\Services\Concerns\ManagesEloquentModels;

class TradeInService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return TradeInRequest::class;
    }

}
