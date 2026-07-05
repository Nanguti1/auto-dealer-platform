<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Reference Data Model - CRM Pipeline Stages
 *
 * NOTE: This model does not have a policy because it is not accessible through
 * the web interface. CRM pipeline stages are managed through database seeders and
 * migrations only. They are used as reference data for lead pipeline management
 * throughout the application.
 *
 * All reference data models (CRM stages, etc.) are intentionally restricted to
 * database-level management to maintain data consistency and prevent accidental
 * modification through the UI. Changes to reference data should be made through
 * proper database migrations to ensure data integrity across the application.
 */
class CrmStage extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'sort_order', 'is_won', 'is_lost'];

    protected function casts(): array
    {
        return [
            'is_won' => 'boolean',
            'is_lost' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}
