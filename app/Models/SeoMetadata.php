<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoMetadata extends Model
{
    use HasFactory;

    protected $fillable = ['meta_title', 'meta_description', 'canonical_url', 'open_graph', 'schema_markup'];

    protected function casts(): array
    {
        return [
            'open_graph' => 'array',
            'schema_markup' => 'array',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
