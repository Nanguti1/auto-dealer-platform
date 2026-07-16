<?php

declare(strict_types=1);

namespace App\Observers;

use App\Events\SupplierCreated;
use App\Events\SupplierDeleted;
use App\Events\SupplierUpdated;
use App\Models\Supplier;

class SupplierObserver
{
    public function created(Supplier $supplier): void
    {
        event(new SupplierCreated($supplier));
    }

    public function updated(Supplier $supplier): void
    {
        event(new SupplierUpdated($supplier));
    }

    public function deleted(Supplier $supplier): void
    {
        event(new SupplierDeleted($supplier));
    }
}
