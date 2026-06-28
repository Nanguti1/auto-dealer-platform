<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeInVehiclePhoto extends Model
{
    use HasFactory;

    protected $fillable = ['trade_in_request_id', 'path', 'label', 'sort_order'];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
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
}
