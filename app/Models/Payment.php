<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['branch_id', 'customer_id', 'user_id', 'vehicle_id', 'vehicle_reservation_id', 'invoice_id', 'amount', 'currency', 'method', 'status', 'transaction_reference', 'paid_at', 'metadata', 'created_by', 'updated_by', 'processed_by', 'processed_at'];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'paid_at' => 'datetime',
            'processed_at' => 'datetime',
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    public function markAsPaid(): void
    {
        $this->update([
            'status' => 'completed',
            'paid_at' => now(),
        ]);
    }

    public function markAsFailed(): void
    {
        $this->update(['status' => 'failed']);
    }

    public function markAsRefunded(): void
    {
        $this->update(['status' => 'refunded']);
    }
}
