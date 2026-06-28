<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalyticsData extends Model
{
    use HasFactory;

    protected $fillable = ['metric', 'dimension', 'value', 'recorded_on', 'metadata'];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'recorded_on' => 'date',
            'value' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
