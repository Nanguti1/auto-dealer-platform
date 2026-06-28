<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleFeatureMapping extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'vehicle_feature_id'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function vehicleFeature(): BelongsTo
    {
        return $this->belongsTo(VehicleFeature::class, 'vehicle_feature_id');
    }
}
