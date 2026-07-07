<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Opening Hour Model
 *
 * SINGLE-TENANT APPLICATION WITH BRANCH-LEVEL ISOLATION
 *
 * This model stores business hours for each branch location.
 * It uses the BranchAware trait for branch-level isolation, not company-level isolation.
 *
 * Opening Hour Purpose:
 * - Stores business hours for each branch location
 * - Provides branch-specific operating hours
 * - Supports different hours per location
 * - Used for scheduling and availability checks
 *
 * Isolation Strategy:
 * - Branch-level isolation via BranchAware trait
 * - No company-level isolation (single-tenant application)
 * - Each branch has its own opening hours
 * - Users can only see opening hours for their assigned branch
 */
class OpeningHour extends Model
{
    use BranchAware, HasFactory;

    protected $fillable = ['branch_id', 'day_of_week', 'opens_at', 'closes_at', 'is_closed'];

    protected function casts(): array
    {
        return [
            'is_closed' => 'boolean',
            'day_of_week' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
