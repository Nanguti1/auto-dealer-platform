<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
