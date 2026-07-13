<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleReservation extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['branch_id', 'vehicle_id', 'user_id', 'deposit_amount', 'status', 'expires_at'];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'deposit_amount' => 'decimal:2',
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function confirm(): void
    {
        $this->update(['status' => 'confirmed']);
        $this->vehicle->markAsReserved();
    }

    public function cancel(): void
    {
        $this->update(['status' => 'cancelled']);
        $this->vehicle->markAsAvailable();
    }

    public function expire(): void
    {
        $this->update(['status' => 'expired']);
        $this->vehicle->markAsAvailable();
    }
}
