<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\ImportPayment;
use Illuminate\Support\Facades\Auth;

class ImportPaymentObserver
{
    public function creating(ImportPayment $importPayment): void
    {
        if (Auth::check() && ! $importPayment->created_by) {
            $importPayment->created_by = Auth::id();
        }
    }

    public function updating(ImportPayment $importPayment): void
    {
        if (Auth::check()) {
            $importPayment->updated_by = Auth::id();
        }
    }
}
