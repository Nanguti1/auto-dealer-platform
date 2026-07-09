<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Refund;
use Illuminate\Support\Facades\Auth;

class RefundObserver
{
    public function creating(Refund $refund): void
    {
        if (Auth::check() && ! $refund->created_by) {
            $refund->created_by = Auth::id();
            $refund->refunded_by = Auth::id();
        }
    }

    public function updating(Refund $refund): void
    {
        if (Auth::check()) {
            $refund->updated_by = Auth::id();
        }
    }
}
