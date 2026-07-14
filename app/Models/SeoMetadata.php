<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SeoMetadata extends Model
{
    use HasFactory;

    protected $fillable = ['seoable_type', 'seoable_id', 'meta_title', 'meta_description', 'canonical_url', 'open_graph', 'schema_markup'];

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

    public function seoable(): MorphTo
    {
        return $this->morphTo();
    }
}
