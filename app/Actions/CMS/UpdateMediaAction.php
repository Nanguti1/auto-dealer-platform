<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\Media;
use App\Services\CMS\MediaService;

class UpdateMediaAction
{
    public function __construct(private readonly MediaService $service) {}

    public function __invoke(Media $media, array $data): Media
    {
        return $this->service->update($media, $data);
    }
}
