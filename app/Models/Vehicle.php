<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use BranchAware, HasFactory, HasSlug, SoftDeletes;

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

    public function vehicleStatus(): BelongsTo
    {
        return $this->belongsTo(VehicleStatus::class, 'vehicle_status_id');
    }

    public function vehicleCategory(): BelongsTo
    {
        return $this->belongsTo(VehicleCategory::class, 'vehicle_category_id');
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(VehicleFeature::class, 'vehicle_feature_mappings');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(VehicleGallery::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(VehicleVideo::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(VehicleDocument::class);
    }

    public function histories(): HasMany
    {
        return $this->hasMany(VehicleHistory::class);
    }

    public function priceHistories(): HasMany
    {
        return $this->hasMany(PriceHistory::class);
    }

    public function enquiries(): HasMany
    {
        return $this->hasMany(VehicleEnquiry::class);
    }

    public function testDriveBookings(): HasMany
    {
        return $this->hasMany(TestDriveBooking::class);
    }

    public function financeApplications(): HasMany
    {
        return $this->hasMany(FinanceApplication::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function recentlyViewed(): HasMany
    {
        return $this->hasMany(RecentlyViewedVehicle::class);
    }

    public function comparisonItems(): HasMany
    {
        return $this->hasMany(ComparisonItem::class);
    }

    public function couponUsages(): HasMany
    {
        return $this->hasMany(CouponUsage::class);
    }

    public function tradeInRequests(): HasMany
    {
        return $this->hasMany(TradeInRequest::class);
    }

    public function promotions(): BelongsToMany
    {
        return $this->belongsToMany(Promotion::class, 'promotion_vehicles');
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

    public function reservations(): HasMany
    {
        return $this->hasMany(VehicleReservation::class, 'vehicle_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'vehicle_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'vehicle_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function markAsReserved(): void
    {
        $reservedStatus = InventoryStatus::where('slug', 'reserved')->first();
        if ($reservedStatus) {
            $this->update(['inventory_status_id' => $reservedStatus->id]);
        }
    }

    public function markAsAvailable(): void
    {
        $availableStatus = InventoryStatus::where('slug', 'available')->first();
        if ($availableStatus) {
            $this->update(['inventory_status_id' => $availableStatus->id, 'assigned_user_id' => null]);
        }
    }

    public function markAsSold(User $buyer): void
    {
        $soldStatus = InventoryStatus::where('slug', 'sold')->first();
        if ($soldStatus) {
            $this->update([
                'inventory_status_id' => $soldStatus->id,
                'assigned_user_id' => $buyer->id,
                'sold_at' => now(),
                'is_featured' => false,
            ]);
        }
    }

    public function markAsDelivered(): void
    {
        $deliveredStatus = InventoryStatus::where('slug', 'delivered')->first();
        if ($deliveredStatus) {
            $this->update(['inventory_status_id' => $deliveredStatus->id]);
        }
    }

    public function markAsCancelled(): void
    {
        $cancelledStatus = InventoryStatus::where('slug', 'cancelled')->first();
        if ($cancelledStatus) {
            $this->update([
                'inventory_status_id' => $cancelledStatus->id,
                'assigned_user_id' => null,
                'sold_at' => null,
            ]);
        }
    }

    public function markAsReturned(): void
    {
        $returnedStatus = InventoryStatus::where('slug', 'returned')->first();
        if ($returnedStatus) {
            $this->update([
                'inventory_status_id' => $returnedStatus->id,
                'assigned_user_id' => null,
                'sold_at' => null,
            ]);
        }
    }
}
