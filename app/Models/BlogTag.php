<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogTag extends Model
{
    use HasFactory, HasSlug, SoftDeletes;

    protected string $slugSourceField = 'name';

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
