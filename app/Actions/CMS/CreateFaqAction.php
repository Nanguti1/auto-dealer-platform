<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\Faq;
use App\Services\CMS\FaqService;

class CreateFaqAction
{
    public function __construct(private readonly FaqService $service) {}

    public function __invoke(array $data): Faq
    {
        return $this->service->create($data);
    }
}
