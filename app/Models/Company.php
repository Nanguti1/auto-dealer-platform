<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'legal_name', 'slug', 'email', 'phone', 'website', 'logo_path', 'description', 'settings', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'settings' => 'array',
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

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    public function companyInformation(): HasMany
    {
        return $this->hasMany(CompanyInformation::class);
    }

    public function socialMediaLinks(): HasMany
    {
        return $this->hasMany(SocialMediaLink::class);
    }

    public function openingHours(): HasMany
    {
        return $this->hasMany(OpeningHour::class);
    }
}
