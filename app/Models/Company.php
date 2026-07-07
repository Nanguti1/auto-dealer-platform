<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Company Model
 *
 * SINGLE-TENANT APPLICATION
 *
 * This application is designed as a single-tenant system with branch-level multi-location support.
 * The Company model serves as the organization's profile/configuration data, not as a tenant isolation boundary.
 *
 * Actual multi-location isolation is implemented at the branch level using the BranchAware trait.
 * Users, vehicles, and other business data are isolated by branch, not by company.
 *
 * Company Model Purpose:
 * - Stores company profile information (name, legal name, contact details)
 * - Stores company-wide settings and configuration
 * - Provides company branding (logo, website)
 * - Links to company information (settings key-value pairs)
 * - Links to social media links
 * - Links to branches (locations)
 *
 * No company-level isolation is implemented because:
 * - This is a single-tenant application
 * - Branch-level isolation provides sufficient multi-location support
 * - Company is for informational/configuration purposes only
 * - No CompanyAware trait, CompanyPolicy, or company filtering exists
 * - No company controllers, routes, or web interface exist
 */
class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'legal_name', 'slug', 'email', 'phone', 'website', 'logo_path', 'description', 'settings', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'settings' => 'array',
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

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    public function companyInformation(): HasMany
    {
        return $this->hasMany(CompanyInformation::class);
    }

    public function socialMediaLinks(): HasMany
    {
        return $this->hasMany(SocialMediaLink::class);
    }

    public function openingHours(): HasMany
    {
        return $this->hasMany(OpeningHour::class);
    }
}
