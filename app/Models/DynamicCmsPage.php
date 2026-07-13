<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DynamicCmsPage extends Model
{
    use HasFactory, HasSlug, SoftDeletes;

    protected $fillable = ['title', 'slug', 'body', 'content', 'status', 'published_at', 'is_visible', 'meta_title', 'meta_description'];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
