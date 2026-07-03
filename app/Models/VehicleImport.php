<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleImport extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'supplier_id', 'vehicle_id', 'reference_number', 'origin_country', 'destination_port', 'estimated_cost', 'status', 'request_data'];

    protected function casts(): array
    {
        return [
            'request_data' => 'array',
            'estimated_cost' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ImportDocument::class, 'vehicle_import_id');
    }

    public function shipments(): HasMany
    {
        return $this->hasMany(ImportShipment::class, 'vehicle_import_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(ImportPayment::class, 'vehicle_import_id');
    }

    public function vehicleMappings(): HasMany
    {
        return $this->hasMany(ImportVehicleMapping::class, 'vehicle_import_id');
    }
}
