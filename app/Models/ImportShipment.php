<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportShipment extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = [
        'vehicle_import_id',
        'tracking_number',
        'carrier',
        'status',
        'current_location',
        'estimated_arrival',
        'actual_arrival',
        'origin',
        'destination',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'estimated_arrival' => 'datetime',
            'actual_arrival' => 'datetime',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicleImport(): BelongsTo
    {
        return $this->belongsTo(VehicleImport::class, 'vehicle_import_id');
    }
}
