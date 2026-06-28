<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedSearch extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'filters', 'notify_on_match'];

    protected function casts(): array
    {
        return [
            'notify_on_match' => 'boolean',
            'filters' => 'array',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
