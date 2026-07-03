<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class TradeInRequest extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'vehicle_id', 'make', 'model', 'year', 'vin', 'mileage', 'estimated_value', 'offered_value', 'status', 'condition_report'];

    protected function casts(): array
    {
        return [
            'condition_report' => 'array',
            'estimated_value' => 'decimal:2',
            'offered_value' => 'decimal:2',
            'mileage' => 'integer',
            'year' => 'integer',
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

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function valuations(): HasMany
    {
        return $this->hasMany(TradeInValuation::class, 'trade_in_request_id');
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(TradeInInspection::class, 'trade_in_request_id');
    }

    public function offers(): HasMany
    {
        return $this->hasMany(TradeInOffer::class, 'trade_in_request_id');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(TradeInVehiclePhoto::class, 'trade_in_request_id');
    }

    public function markAsPending(): void
    {
        $this->update(['status' => 'pending']);
    }

    public function markAsUnderReview(): void
    {
        $this->update(['status' => 'under_review']);
    }

    public function markAsInspectionScheduled(): void
    {
        $this->update(['status' => 'inspection_scheduled']);
    }

    public function markAsInspectionCompleted(): void
    {
        $this->update(['status' => 'inspection_completed']);
    }

    public function markAsOfferPending(): void
    {
        $this->update(['status' => 'offer_pending']);
    }

    public function markAsOfferAccepted(): void
    {
        $this->update(['status' => 'offer_accepted']);
    }

    public function markAsOfferRejected(): void
    {
        $this->update(['status' => 'offer_rejected']);
    }

    public function markAsApproved(): void
    {
        $this->update(['status' => 'approved']);
    }

    public function markAsRejected(): void
    {
        $this->update(['status' => 'rejected']);
    }

    public function markAsCompleted(): void
    {
        $this->update(['status' => 'completed']);
    }

    public function markAsCancelled(): void
    {
        $this->update(['status' => 'cancelled']);
    }
}
