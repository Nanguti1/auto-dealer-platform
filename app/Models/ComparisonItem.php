<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComparisonItem extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_comparison_id', 'vehicle_id'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicleComparison(): BelongsTo
    {
        return $this->belongsTo(VehicleComparison::class, 'vehicle_comparison_id');
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
}
