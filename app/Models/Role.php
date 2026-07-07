<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Role Model
 *
 * This application uses role-based authorization exclusively.
 * The permission system has been removed as it was unused (no $user->can() or Gate::allows() calls).
 * All 48 policies use role names directly for authorization checks.
 *
 * Roles: admin, manager, staff, customer
 */
class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'display_name', 'description', 'is_system'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
