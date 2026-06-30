<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_import_id',
        'payment_id',
        'payment_reference',
        'amount',
        'currency',
        'payment_type',
        'status',
        'due_date',
        'paid_at',
        'notes',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'due_date' => 'date',
            'paid_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function vehicleImport(): BelongsTo
    {
        return $this->belongsTo(VehicleImport::class, 'vehicle_import_id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }
}
