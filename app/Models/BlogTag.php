<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogTag extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'slug', 'color', 'usage_count'];

    protected function casts(): array
    {
        return [
            'usage_count' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tags');
    }
}
