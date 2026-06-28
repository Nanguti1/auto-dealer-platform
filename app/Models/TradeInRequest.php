<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeInRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'vehicle_id', 'make', 'model', 'year', 'vin', 'mileage', 'estimated_value', 'offered_value', 'status', 'condition_report'];

    protected function casts(): array
    {
        return [
            'condition_report' => 'array',
            'estimated_value' => 'decimal:2',
            'offered_value' => 'decimal:2',
            'mileage' => 'integer',
            'year' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
}
