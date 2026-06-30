<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\HeroSlider;
use App\Services\CMS\HeroSliderService;

class CreateHeroSliderAction
{
    public function __construct(private readonly HeroSliderService $service) {}

    public function __invoke(array $data): HeroSlider
    {
        return $this->service->create($data);
    }
}
