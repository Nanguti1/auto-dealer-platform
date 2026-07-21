<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{
    use HasFactory, HasSlug, SoftDeletes;

    protected ?string $slugSourceField = 'name';

    protected $fillable = ['name', 'slug', 'type', 'value', 'starts_at', 'ends_at', 'is_active', 'rules', 'banner'];

    protected $appends = ['banner_path', 'description', 'campaign_status', 'visibility'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'rules' => 'array',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'value' => 'decimal:2',
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

    public function vehicles(): BelongsToMany
    {
        return $this->belongsToMany(Vehicle::class, 'promotion_vehicles');
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }

    public function getBannerPathAttribute(): ?string
    {
        if ($this->banner) {
            return asset('storage/'.$this->banner);
        }

        return null;
    }

    public function getDescriptionAttribute(): ?string
    {
        return $this->rules['description'] ?? null;
    }

    public function getCampaignStatusAttribute(): ?string
    {
        return $this->rules['status'] ?? ($this->is_active ? 'active' : 'draft');
    }

    public function getVisibilityAttribute(): ?string
    {
        return $this->rules['visibility'] ?? 'public';
    }
}
