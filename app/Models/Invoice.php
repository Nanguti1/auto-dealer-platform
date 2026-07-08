<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['branch_id','user_id', 'vehicle_id', 'invoice_number', 'subtotal', 'tax_total', 'total', 'status', 'issued_at', 'due_at'];

    protected function casts(): array
    {
        return [
            'issued_at' => 'date',
            'due_at' => 'date',
            'subtotal' => 'decimal:2',
            'tax_total' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    public function receipts(): HasMany
    {
        return $this->hasMany(Receipt::class, 'invoice_id');
    }

    public function refunds(): HasMany
    {
        return $this->hasMany(Refund::class, 'invoice_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'invoice_id');
    }
}
