<?php

declare(strict_types=1);

namespace App\Services\Users;

use App\Models\Role;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class RoleService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Role::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Role::query()->withCount('users');

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('display_name', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['is_system'])) {
            $query->where('is_system', $filters['is_system']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): Role
    {
        $role = Role::create($data);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role;
    }

    public function update(Role $role, array $data): Role
    {
        $role->update($data);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role->fresh();
    }
}
