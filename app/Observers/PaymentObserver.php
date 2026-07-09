<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class PaymentObserver
{
    public function creating(Payment $payment): void
    {
        if (Auth::check() && ! $payment->created_by) {
            $payment->created_by = Auth::id();
        }
    }

    public function updating(Payment $payment): void
    {
        if (Auth::check()) {
            $payment->updated_by = Auth::id();
        }
    }
}
