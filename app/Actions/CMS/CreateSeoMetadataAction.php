<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\SeoMetadata;
use App\Services\CMS\SeoMetadataService;

class CreateSeoMetadataAction
{
    public function __construct(private readonly SeoMetadataService $service) {}

    public function __invoke(array $data): SeoMetadata
    {
        return $this->service->create($data);
    }
}
