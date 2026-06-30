<?php

declare(strict_types=1);

namespace App\Actions\CMS;

use App\Models\Faq;
use App\Services\CMS\FaqService;

class UpdateFaqAction
{
    public function __construct(private readonly FaqService $service) {}

    public function __invoke(Faq $faq, array $data): Faq
    {
        return $this->service->update($faq, $data);
    }
}
