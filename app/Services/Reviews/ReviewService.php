<?php

declare(strict_types=1);

namespace App\Services\Reviews;

use App\Models\Review;
use App\Services\Concerns\ManagesEloquentModels;

class ReviewService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Review::class;
    }

}
