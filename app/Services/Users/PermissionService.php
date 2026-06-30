<?php

declare(strict_types=1);

namespace App\Services\Users;

use App\Models\Permission;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class PermissionService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Permission::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Permission::query()->withCount('roles');

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('display_name', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['module'])) {
            $query->where('module', $filters['module']);
        }

        return $query->orderBy('module')
            ->orderBy('name')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    public function update(Permission $permission, array $data): Permission
    {
        $permission->update($data);

        return $permission->fresh();
    }
}
