<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeInInspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'trade_in_request_id',
        'inspector_id',
        'inspection_date',
        'status',
        'condition_details',
        'notes',
        'estimated_repair_cost',
        'repair_recommendations',
        'photos',
    ];

    protected function casts(): array
    {
        return [
            'condition_details' => 'array',
            'photos' => 'array',
            'estimated_repair_cost' => 'decimal:2',
            'inspection_date' => 'date',
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

    public function inspector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inspector_id');
    }
}
