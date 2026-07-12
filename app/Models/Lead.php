<?php

namespace App\Models;

use App\Models\Concerns\BranchAware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use BranchAware, HasFactory, SoftDeletes;

    protected $fillable = ['crm_stage_id', 'assigned_user_id', 'vehicle_id', 'source', 'status', 'first_name', 'last_name', 'email', 'phone', 'budget', 'last_contacted_at'];

    protected function casts(): array
    {
        return [
            'last_contacted_at' => 'datetime',
            'budget' => 'decimal:2',
        ];
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    public function crmStage(): BelongsTo
    {
        return $this->belongsTo(CrmStage::class, 'crm_stage_id');
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function followUps(): HasMany
    {
        return $this->hasMany(CrmFollowUp::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(CrmNote::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(CrmTask::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(CrmNotification::class);
    }
}
