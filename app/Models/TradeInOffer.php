<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeInOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'trade_in_request_id',
        'valuation_id',
        'created_by',
        'offer_amount',
        'valid_until',
        'status',
        'notes',
        'terms',
        'accepted_at',
        'rejected_at',
    ];

    protected function casts(): array
    {
        return [
            'offer_amount' => 'decimal:2',
            'valid_until' => 'date',
            'terms' => 'array',
            'accepted_at' => 'datetime',
            'rejected_at' => 'datetime',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function tradeInRequest(): BelongsTo
    {
        return $this->belongsTo(TradeInRequest::class, 'trade_in_request_id');
    }

    public function valuation(): BelongsTo
    {
        return $this->belongsTo(TradeInValuation::class, 'valuation_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function markAsPending(): void
    {
        $this->update(['status' => 'pending']);
    }

    public function markAsAccepted(): void
    {
        $this->update([
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);
    }

    public function markAsRejected(): void
    {
        $this->update([
            'status' => 'rejected',
            'rejected_at' => now(),
        ]);
    }

    public function markAsExpired(): void
    {
        $this->update(['status' => 'expired']);
    }

    public function markAsWithdrawn(): void
    {
        $this->update(['status' => 'withdrawn']);
    }
}
