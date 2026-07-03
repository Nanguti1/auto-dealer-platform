<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Database\Factories\FinanceDocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceDocument extends Model
{
    use BranchAware, HasFactory;

    protected static function newFactory()
    {
        return FinanceDocumentFactory::new();
    }

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
