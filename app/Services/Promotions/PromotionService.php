<?php

declare(strict_types=1);

namespace App\Services\Promotions;

use App\Models\Promotion;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;

class PromotionService
{
    use ManagesEloquentModels {
        create as traitCreate;
        update as traitUpdate;
    }

    protected function modelClass(): string
    {
        return Promotion::class;
    }

    public function create(array $data): Promotion
    {
        $banner = $data['banner'] ?? null;
        unset($data['banner']);

        if ($banner instanceof UploadedFile) {
            $path = $banner->store('promotions', 'public');
            $data['banner'] = $path;
        }

        return $this->traitCreate($data);
    }

    public function update(Promotion $promotion, array $data): Promotion
    {
        $banner = $data['banner'] ?? null;
        unset($data['banner']);

        if ($banner instanceof UploadedFile) {
            $path = $banner->store('promotions', 'public');
            $data['banner'] = $path;
        }

        return $this->traitUpdate($promotion, $data);
    }
}
