<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Reference Data Model - Vehicle Colors
 *
 * NOTE: This model does not have a policy because it is not accessible through
 * the web interface. Vehicle colors are managed through database seeders and
 * migrations only. They are used as reference data for vehicle filtering and
 * dropdown options throughout the application.
 *
 * All reference data models (Make, Model, BodyType, FuelType, etc.) are intentionally
 * restricted to database-level management to maintain data consistency and prevent
 * accidental modification through the UI. Changes to reference data should be made
 * through proper database migrations to ensure data integrity across the application.
 */
class Color extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'code', 'description', 'is_active', 'sort_order'];

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
}
