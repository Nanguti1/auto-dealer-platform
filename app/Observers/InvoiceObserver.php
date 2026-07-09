<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Invoice;
use Illuminate\Support\Facades\Auth;

class InvoiceObserver
{
    public function creating(Invoice $invoice): void
    {
        if (Auth::check() && ! $invoice->created_by) {
            $invoice->created_by = Auth::id();
        }
    }

    public function updating(Invoice $invoice): void
    {
        if (Auth::check()) {
            $invoice->updated_by = Auth::id();
        }
    }
}
