<?php

declare(strict_types=1);

namespace App\Services\Promotions;

use App\Models\Promotion;
use App\Services\Concerns\ManagesEloquentModels;

class PromotionService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Promotion::class;
    }

}
