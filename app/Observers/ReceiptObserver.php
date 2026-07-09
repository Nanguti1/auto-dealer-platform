<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Receipt;
use Illuminate\Support\Facades\Auth;

class ReceiptObserver
{
    public function creating(Receipt $receipt): void
    {
        if (Auth::check() && ! $receipt->created_by) {
            $receipt->created_by = Auth::id();
        }
        if (Auth::check() && ! $receipt->issued_by && ! $receipt->issued_at) {
            $receipt->issued_by = Auth::id();
            $receipt->issued_at = now();
        }
    }

    public function updating(Receipt $receipt): void
    {
        if (Auth::check()) {
            $receipt->updated_by = Auth::id();
        }
    }
}
