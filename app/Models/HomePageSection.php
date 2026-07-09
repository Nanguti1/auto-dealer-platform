<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HomePageSection extends Model
{
    use HasFactory, HasSlug, SoftDeletes;

    protected ?string $slugSourceField = 'name';

    protected $fillable = ['name', 'slug', 'type', 'content', 'is_active', 'sort_order'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'content' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
