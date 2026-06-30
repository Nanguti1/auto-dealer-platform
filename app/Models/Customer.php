<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'customer_number', 'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'preferences'];

    protected function casts(): array
    {
        return [
            'preferences' => 'array',
            'date_of_birth' => 'date',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function documents(): HasMany
    {
        return $this->hasMany(CustomerDocument::class, 'customer_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(CustomerNote::class, 'customer_id');
    }
}
