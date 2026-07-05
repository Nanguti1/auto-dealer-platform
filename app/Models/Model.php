<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Reference Data Model - Vehicle Models
 *
 * NOTE: This model does not have a policy because it is not accessible through
 * the web interface. Vehicle models are managed through database seeders and
 * migrations only. They are used as reference data for vehicle filtering and
 * dropdown options throughout the application.
 *
 * All reference data models (Make, Model, BodyType, FuelType, etc.) are intentionally
 * restricted to database-level management to maintain data consistency and prevent
 * accidental modification through the UI. Changes to reference data should be made
 * through proper database migrations to ensure data integrity across the application.
 */
class Model extends EloquentModel
{
    use HasFactory;

    protected $fillable = ['make_id', 'name', 'slug', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
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

    public function make(): BelongsTo
    {
        return $this->belongsTo(Make::class, 'make_id');
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    public function trimLevels(): HasMany
    {
        return $this->hasMany(TrimLevel::class);
    }
}
