<?php

declare(strict_types=1);

namespace App\Services\Suppliers;

use App\Models\Supplier;
use App\Services\Concerns\ManagesEloquentModels;

class SupplierService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Supplier::class;
    }
}
