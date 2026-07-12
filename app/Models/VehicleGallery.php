<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleGallery extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['vehicle_id', 'path', 'alt_text', 'is_primary', 'sort_order', 'metadata'];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
            'metadata' => 'array',
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

    public function getPathAttribute(): string
    {
        return $this->attributes['path'] ? asset('storage/'.$this->getRawOriginal('path')) : '';
    }
}
