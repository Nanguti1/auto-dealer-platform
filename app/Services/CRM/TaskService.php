<?php

declare(strict_types=1);

namespace App\Services\CRM;

use App\Models\CrmTask;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class TaskService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return CrmTask::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = CrmTask::query()->with('lead', 'assignedUser');

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%'.$filters['search'].'%')
                    ->orWhere('description', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (isset($filters['lead_id'])) {
            $query->where('lead_id', $filters['lead_id']);
        }

        return $query->orderBy('due_at', 'asc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): CrmTask
    {
        return CrmTask::create($data);
    }

    public function update(CrmTask $task, array $data): CrmTask
    {
        $task->update($data);

        return $task->fresh();
    }
}
