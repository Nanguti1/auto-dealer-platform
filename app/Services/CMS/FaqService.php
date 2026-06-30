<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\Faq;
use App\Services\Concerns\ManagesEloquentModels;

class FaqService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Faq::class;
    }
}
