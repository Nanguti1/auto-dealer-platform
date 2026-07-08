<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Refund extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['branch_id','user_id', 'payment_id', 'invoice_id', 'refund_number', 'amount', 'currency', 'reason', 'status', 'processed_at', 'notes'];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'processed_at' => 'datetime',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }
}
