<?php

declare(strict_types=1);

namespace App\Services\Payments;

use App\Models\Payment;
use App\Services\Concerns\ManagesEloquentModels;

class PaymentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Payment::class;
    }

}
