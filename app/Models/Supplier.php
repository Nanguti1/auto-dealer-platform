<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = [
        'branch_id',
        'company_name',
        'supplier_code',
        'contact_person',
        'supplier_type',
        'email',
        'phone',
        'alternative_phone',
        'website',
        'country',
        'county',
        'city',
        'postal_code',
        'physical_address',
        'tax_pin',
        'registration_number',
        'payment_terms',
        'currency',
        'credit_limit',
        'status',
        'notes',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'credit_limit' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($supplier) {
            if (empty($supplier->supplier_code)) {
                $supplier->supplier_code = 'SUP-'.str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
            }
            if (auth()->check()) {
                $supplier->created_by = auth()->id();
            }
        });

        static::updating(function ($supplier) {
            if (auth()->check()) {
                $supplier->updated_by = auth()->id();
            }
        });
    }
}
