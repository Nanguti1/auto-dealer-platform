<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyInformation extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'key', 'value', 'type'];

    public function scopeRecent($query)
    {
        return $query->latest();
    }
}
