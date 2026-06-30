<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    protected $fillable = ['name', 'display_name', 'description', 'is_system', 'guard_name'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
