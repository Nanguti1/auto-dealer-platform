<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'vehicle_id', 'rating', 'title', 'body', 'status', 'approved_at'];

    protected function casts(): array
    {
        return [
            'approved_at' => 'datetime',
            'rating' => 'integer',
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
}
