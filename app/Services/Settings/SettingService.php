<?php

declare(strict_types=1);

namespace App\Services\Settings;

use App\Models\Setting;
use App\Services\Concerns\ManagesEloquentModels;

class SettingService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Setting::class;
    }

}
