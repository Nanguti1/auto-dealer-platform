<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['branch_id', 'vehicle_category_id', 'make_id', 'model_id', 'trim_level_id', 'body_type_id', 'fuel_type_id', 'transmission_type_id', 'drive_type_id', 'engine_type_id', 'color_id', 'interior_color_id', 'vehicle_condition_id', 'vehicle_status_id', 'inventory_status_id', 'assigned_user_id', 'stock_number', 'vin', 'year', 'title', 'slug', 'mileage', 'cost_price', 'sale_price', 'msrp', 'is_featured', 'is_certified', 'acquired_at', 'listed_at', 'sold_at', 'description', 'metadata'];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_certified' => 'boolean',
            'metadata' => 'array',
            'acquired_at' => 'date',
            'listed_at' => 'date',
            'sold_at' => 'date',
            'cost_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'msrp' => 'decimal:2',
            'mileage' => 'integer',
            'year' => 'integer',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function make(): BelongsTo
    {
        return $this->belongsTo(Make::class, 'make_id');
    }

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Model::class, 'model_id');
    }

    public function trimLevel(): BelongsTo
    {
        return $this->belongsTo(TrimLevel::class, 'trim_level_id');
    }

    public function bodyType(): BelongsTo
    {
        return $this->belongsTo(BodyType::class, 'body_type_id');
    }

    public function fuelType(): BelongsTo
    {
        return $this->belongsTo(FuelType::class, 'fuel_type_id');
    }

    public function transmissionType(): BelongsTo
    {
        return $this->belongsTo(TransmissionType::class, 'transmission_type_id');
    }

    public function driveType(): BelongsTo
    {
        return $this->belongsTo(DriveType::class, 'drive_type_id');
    }

    public function engineType(): BelongsTo
    {
        return $this->belongsTo(EngineType::class, 'engine_type_id');
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class, 'color_id');
    }

    public function interiorColor(): BelongsTo
    {
        return $this->belongsTo(InteriorColor::class, 'interior_color_id');
    }

    public function vehicleCondition(): BelongsTo
    {
        return $this->belongsTo(VehicleCondition::class, 'vehicle_condition_id');
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(VehicleFeature::class, 'vehicle_feature_mappings');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(VehicleGallery::class);
    }

    public function specifications(): HasMany
    {
        return $this->hasMany(VehicleSpecification::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function inventoryStatus(): BelongsTo
    {
        return $this->belongsTo(InventoryStatus::class, 'inventory_status_id');
    }
}
