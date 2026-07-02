<?php

declare(strict_types=1);

namespace App\Actions\Finance;

use App\Models\FinanceApplication;
use App\Services\Finance\FinanceService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class RejectFinanceApplicationAction
{
    public function __construct(private readonly FinanceService $service) {}

    public function __invoke(FinanceApplication $financeApplication): EloquentModel
    {
        return $this->service->update($financeApplication, ['status' => 'rejected']);
    }
}
