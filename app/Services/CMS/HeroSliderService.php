<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\HeroSlider;
use App\Services\Concerns\ManagesEloquentModels;

class HeroSliderService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return HeroSlider::class;
    }
}
