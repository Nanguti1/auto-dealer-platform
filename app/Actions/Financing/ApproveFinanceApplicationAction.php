<?php

declare(strict_types=1);

namespace App\Actions\Financing;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\FinanceApplication;
use App\Services\Financing\FinanceService;

class ApproveFinanceApplicationAction
{
    public function __construct(private readonly FinanceService $service)
    {
    }

    public function __invoke(FinanceApplication $financeApplication): EloquentModel
    {
        return $this->service->update($financeApplication, ['status' => 'approved']);
    }
}
