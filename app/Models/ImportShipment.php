<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Database\Factories\ImportShipmentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportShipment extends Model
{
    use BranchAware, HasFactory;

    protected static function newFactory()
    {
        return ImportShipmentFactory::new();
    }

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
        'shipment_reference',
        'container_number',
        'shipping_line',
        'vessel',
        'port_of_loading',
        'destination_port',
        'customs_status',
        'tracking_events',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'tracking_events' => 'array',
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
