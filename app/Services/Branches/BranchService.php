<?php

declare(strict_types=1);

namespace App\Services\Branches;

use App\Models\Branch;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class BranchService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Branch::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Branch::query();

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('code', 'like', '%'.$filters['search'].'%')
                    ->orWhere('city', 'like', '%'.$filters['search'].'%')
                    ->orWhere('email', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('is_active', $filters['status'] === 'active');
        }

        if (isset($filters['city'])) {
            $query->where('city', $filters['city']);
        }

        if (isset($filters['state'])) {
            $query->where('state', $filters['state']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }
}
