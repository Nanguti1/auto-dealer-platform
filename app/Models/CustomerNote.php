<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerNote extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'user_id', 'body', 'is_private'];

    protected function casts(): array
    {
        return [
            'is_private' => 'boolean',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
