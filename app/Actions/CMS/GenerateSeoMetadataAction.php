<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\DynamicCmsPage;
use App\Services\CMS\CMSService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class GenerateSeoMetadataAction
{
    public function __construct(private readonly CMSService $service) {}

    public function __invoke(DynamicCmsPage $page, array $metadata): EloquentModel
    {
        return $this->service->update($page, ['metadata' => $metadata]);
    }
}
