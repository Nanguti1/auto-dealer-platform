<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Branch Model
 *
 * SINGLE-TENANT APPLICATION WITH BRANCH-LEVEL MULTI-LOCATION SUPPORT
 *
 * This application is designed as a single-tenant system where branches represent
 * physical locations of the same company. Branch-level isolation provides
 * multi-location support without the complexity of multi-tenancy.
 *
 * Branch Model Purpose:
 * - Represents physical locations (dealerships, showrooms, service centers)
 * - Provides branch-level data isolation using BranchAware trait
 * - Links users to specific branches for access control
 * - Links vehicles to specific branches for inventory management
 * - Associates with company for organizational hierarchy
 *
 * company_id Field Purpose:
 * - Links branch to company for organizational structure
 * - Enables company-wide reporting and aggregation
 * - NOT used for tenant isolation (single-tenant application)
 * - Used for informational/hierarchical purposes only
 *
 * Isolation Strategy:
 * - Branch-level isolation via BranchAware trait (users, vehicles, etc.)
 * - No company-level isolation (single-tenant application)
 * - Admins/managers can see all branches
 * - Regular users can only see their assigned branch
 */
class Branch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['company_id', 'name', 'slug', 'code', 'email', 'phone', 'address_line_1', 'address_line_2', 'city', 'state', 'postal_code', 'country', 'latitude', 'longitude', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'latitude' => 'decimal:2',
            'longitude' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
