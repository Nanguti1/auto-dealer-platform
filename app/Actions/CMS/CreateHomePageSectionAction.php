<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\HomePageSection;
use App\Services\CMS\HomePageSectionService;

class CreateHomePageSectionAction
{
    public function __construct(private readonly HomePageSectionService $service) {}

    public function __invoke(array $data): HomePageSection
    {
        return $this->service->create($data);
    }
}
