<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleComparison extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'session_id'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
