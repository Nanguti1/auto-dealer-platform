<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\Media;
use App\Services\CMS\MediaService;

class CreateMediaAction
{
    public function __construct(private readonly MediaService $service) {}

    public function __invoke(array $data): Media
    {
        return $this->service->create($data);
    }
}
