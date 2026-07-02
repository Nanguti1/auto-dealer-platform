<?php

declare(strict_types=1);

namespace App\Services\Finance;

use App\Models\FinanceApplication;
use App\Services\Concerns\ManagesEloquentModels;

class FinanceService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return FinanceApplication::class;
    }
}
