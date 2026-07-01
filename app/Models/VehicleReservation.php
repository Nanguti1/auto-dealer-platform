<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleReservation extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['vehicle_id', 'user_id', 'deposit_amount', 'status', 'expires_at'];

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
}
