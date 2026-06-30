<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceDocument extends Model
{
    use HasFactory;

    protected $fillable = ['finance_application_id', 'name', 'path', 'type'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function financeApplication(): BelongsTo
    {
        return $this->belongsTo(FinanceApplication::class, 'finance_application_id');
    }
}
