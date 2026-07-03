<?php

declare(strict_types=1);

namespace App\Actions\Finance;

use App\Events\FinanceApproved;
use App\Models\FinanceApplication;
use App\Services\Finance\FinanceService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class ApproveFinanceApplicationAction
{
    public function __construct(private readonly FinanceService $service) {}

    public function __invoke(FinanceApplication $financeApplication): EloquentModel
    {
        $financeApplication = $this->service->update($financeApplication, ['status' => 'approved']);

        event(new FinanceApproved($financeApplication));

        return $financeApplication;
    }
}
