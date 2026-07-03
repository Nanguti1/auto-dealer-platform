<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Database\Factories\ImportDocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportDocument extends Model
{
    use BranchAware, HasFactory;

    protected static function newFactory()
    {
        return ImportDocumentFactory::new();
    }

    protected $fillable = ['vehicle_import_id', 'name', 'type', 'path', 'verified_at'];

    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
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
}
