<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\HeroSlider;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HeroSliderService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return HeroSlider::class;
    }

    /**
     * Override create to handle image upload
     */
    public function create(array $data): HeroSlider
    {
        // Handle image upload
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image_path'] = $data['image']->store('hero-sliders', 'public');
        }

        // Remove image field as it's not a model field
        unset($data['image']);

        return HeroSlider::query()->create($data)->refresh();
    }

    /**
     * Override update to handle image upload
     */
    public function update(HeroSlider $model, array $data): HeroSlider
    {
        // Handle image upload
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // Delete old image if exists
            if ($model->image_path && Storage::disk('public')->exists($model->image_path)) {
                Storage::disk('public')->delete($model->image_path);
            }
            $data['image_path'] = $data['image']->store('hero-sliders', 'public');
        }

        // Remove image field as it's not a model field
        unset($data['image']);

        $model->update($data);

        return $model->refresh();
    }
}
