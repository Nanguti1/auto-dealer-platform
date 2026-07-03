<?php

declare(strict_types=1);

namespace App\Services\Customers;

use App\Models\Customer;
use App\Services\Concerns\ManagesEloquentModels;

class CustomerService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Customer::class;
    }
}
