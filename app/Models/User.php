<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'branch_id',
        'role_id',
        'name',
        'email',
        'phone',
        'password',
        'avatar_path',
        'date_of_birth',
        'address',
        'preferences',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'preferences' => 'array',
            'last_login_at' => 'datetime',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function isAdmin(): bool
    {
        return $this->role && in_array($this->role->name, ['admin', 'manager'], true);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function savedSearches()
    {
        return $this->hasMany(SavedSearch::class);
    }

    public function recentlyViewedVehicles()
    {
        return $this->hasMany(RecentlyViewedVehicle::class);
    }

    public function vehicleReservations()
    {
        return $this->hasMany(VehicleReservation::class);
    }

    public function testDriveBookings()
    {
        return $this->hasMany(TestDriveBooking::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'assigned_user_id');
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class, 'assigned_user_id');
    }

    public function followUps(): HasMany
    {
        return $this->hasMany(CrmFollowUp::class, 'assigned_user_id');
    }

    public function crmNotes(): HasMany
    {
        return $this->hasMany(CrmNote::class);
    }

    public function crmTasks(): HasMany
    {
        return $this->hasMany(CrmTask::class, 'assigned_user_id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(CrmNotification::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }

    public function blogComments(): HasMany
    {
        return $this->hasMany(BlogComment::class);
    }

    public function vehicleEnquiries(): HasMany
    {
        return $this->hasMany(VehicleEnquiry::class, 'assigned_user_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function receipts(): HasMany
    {
        return $this->hasMany(Receipt::class);
    }

    public function refunds(): HasMany
    {
        return $this->hasMany(Refund::class);
    }

    public function couponUsages(): HasMany
    {
        return $this->hasMany(CouponUsage::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    public function priceHistories(): HasMany
    {
        return $this->hasMany(PriceHistory::class);
    }

    public function vehicleImports(): HasMany
    {
        return $this->hasMany(VehicleImport::class);
    }

    public function tradeInValuations(): HasMany
    {
        return $this->hasMany(TradeInValuation::class, 'valuation_source_id');
    }

    public function tradeInInspections(): HasMany
    {
        return $this->hasMany(TradeInInspection::class, 'inspector_id');
    }

    public function tradeInOffers(): HasMany
    {
        return $this->hasMany(TradeInOffer::class, 'created_by');
    }
}
