<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Social Media Link Model
 *
 * SINGLE-TENANT APPLICATION
 *
 * This model stores social media links for the company's online presence.
 * It is used for informational purposes only, not for tenant isolation.
 *
 * Social Media Link Purpose:
 * - Stores company social media profiles (Facebook, Twitter, Instagram, etc.)
 * - Provides social media links for website and marketing
 * - Enables social media integration across the application
 * - Used company-wide across all branches
 *
 * No company-level isolation is implemented because:
 * - This is a single-tenant application
 * - Social media links are for company-wide branding only
 * - All branches share the same company social media presence
 * - No CompanyAware trait or company filtering exists
 */
class SocialMediaLink extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'platform', 'url', 'is_active', 'sort_order'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
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

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
