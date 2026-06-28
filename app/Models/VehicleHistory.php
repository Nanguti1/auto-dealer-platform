<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleHistory extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'event_type', 'event_date', 'title', 'description', 'metadata'];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'event_date' => 'date',
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
