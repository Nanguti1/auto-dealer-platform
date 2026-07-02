<?php

declare(strict_types=1);

namespace App\Actions\Finance;

use App\Services\Finance\FinanceService;

class CalculateLoanAction
{
    public function __construct(private readonly FinanceService $service) {}

    public function __invoke(array $data): array
    {
        return ['monthly_payment' => round(((float) ($data['amount'] ?? 0)) / max((int) ($data['term_months'] ?? 1), 1), 2)];
    }
}
