<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Company Information Model
 *
 * SINGLE-TENANT APPLICATION
 *
 * This model stores company-wide configuration and profile information as key-value pairs.
 * It is used for informational purposes only, not for tenant isolation.
 *
 * Company Information Purpose:
 * - Stores company settings and configuration (business hours, tax rates, etc.)
 * - Stores company profile details (mission statement, about text, etc.)
 * - Provides flexible key-value storage for company metadata
 * - Used company-wide across all branches
 *
 * No company-level isolation is implemented because:
 * - This is a single-tenant application
 * - Company information is for configuration purposes only
 * - All branches share the same company information
 * - No CompanyAware trait or company filtering exists
 */
class CompanyInformation extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'key', 'value', 'type'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
