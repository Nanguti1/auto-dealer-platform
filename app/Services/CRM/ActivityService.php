<?php

declare(strict_types=1);

namespace App\Services\CRM;

use App\Models\CrmFollowUp;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ActivityService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return CrmFollowUp::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = CrmFollowUp::query()->with('lead', 'assignedUser');

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('type', 'like', '%'.$filters['search'].'%')
                    ->orWhere('notes', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (isset($filters['lead_id'])) {
            $query->where('lead_id', $filters['lead_id']);
        }

        return $query->orderBy('due_at', 'asc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): CrmFollowUp
    {
        return CrmFollowUp::create($data);
    }

    public function update(CrmFollowUp $activity, array $data): CrmFollowUp
    {
        $activity->update($data);

        return $activity->fresh();
    }
}
