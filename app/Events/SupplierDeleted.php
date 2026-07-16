<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Supplier;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SupplierDeleted
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Supplier $supplier
    ) {}
}
