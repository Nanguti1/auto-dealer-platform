<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeInValuation extends Model
{
    use HasFactory;

    protected $fillable = [
        'trade_in_request_id',
        'valuation_source_id',
        'trade_in_value',
        'wholesale_value',
        'retail_value',
        'valuation_method',
        'market_comparables',
        'adjustments',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'trade_in_value' => 'decimal:2',
            'wholesale_value' => 'decimal:2',
            'retail_value' => 'decimal:2',
            'market_comparables' => 'array',
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

    public function valuationSource(): BelongsTo
    {
        return $this->belongsTo(User::class, 'valuation_source_id');
    }
}
