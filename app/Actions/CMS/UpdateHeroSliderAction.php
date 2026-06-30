<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\HeroSlider;
use App\Services\CMS\HeroSliderService;

class UpdateHeroSliderAction
{
    public function __construct(private readonly HeroSliderService $service) {}

    public function __invoke(HeroSlider $heroSlider, array $data): HeroSlider
    {
        return $this->service->update($heroSlider, $data);
    }
}
