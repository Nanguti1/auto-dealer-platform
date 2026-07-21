<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'file_name',
        'mime_type',
        'file_size',
        'path',
        'disk',
        'alt_text',
        'caption',
        'category',
        'is_public',
    ];

    protected $hidden = [
        'mediable_type',
        'mediable_id',
    ];

    protected $appends = ['file_path'];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'file_size' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function getFilePathAttribute(): string
    {
        if ($this->path && $this->disk) {
            return Storage::disk($this->disk)->url($this->path);
        }

        return '';
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function mediable(): MorphTo
    {
        return $this->morphTo()->withDefault();
    }
}
