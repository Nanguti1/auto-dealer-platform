<?php

declare(strict_types=1);

namespace App\Actions\Promotions;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\Promotion;
use App\Services\Promotions\PromotionService;

class PublishPromotionAction
{
    public function __construct(private readonly PromotionService $service)
    {
    }

    public function __invoke(Promotion $promotion): EloquentModel
    {
        return $this->service->update($promotion, ['is_active' => true]);
    }
}
