<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FinanceApplication extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['vehicle_id', 'user_id', 'lender_id', 'requested_amount', 'approved_amount', 'down_payment', 'term_months', 'interest_rate', 'estimated_monthly_payment', 'status', 'applicant_data'];

    protected function casts(): array
    {
        return [
            'applicant_data' => 'array',
            'requested_amount' => 'decimal:2',
            'approved_amount' => 'decimal:2',
            'down_payment' => 'decimal:2',
            'interest_rate' => 'decimal:2',
            'estimated_monthly_payment' => 'decimal:2',
            'term_months' => 'integer',
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

    public function lender(): BelongsTo
    {
        return $this->belongsTo(Lender::class, 'lender_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(FinanceDocument::class, 'finance_application_id');
    }
}
