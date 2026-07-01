<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['user_id', 'vehicle_id', 'vehicle_reservation_id', 'amount', 'currency', 'method', 'status', 'transaction_reference', 'paid_at', 'metadata'];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'paid_at' => 'datetime',
            'amount' => 'decimal:2',
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

    public function vehicleReservation(): BelongsTo
    {
        return $this->belongsTo(VehicleReservation::class, 'vehicle_reservation_id');
    }
}
