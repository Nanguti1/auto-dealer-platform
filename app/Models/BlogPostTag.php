<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPostTag extends Model
{
    use HasFactory;

    protected $fillable = ['blog_post_id', 'blog_tag_id'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class, 'blog_post_id');
    }

    public function blogTag(): BelongsTo
    {
        return $this->belongsTo(BlogTag::class, 'blog_tag_id');
    }
}
