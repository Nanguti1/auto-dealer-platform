<?php

declare(strict_types=1);

namespace App\Services\Users;

use App\Models\User;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class UserService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return User::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = User::query()->with('role', 'branch');

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('email', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['role'])) {
            $query->whereHas('role', function ($q) use ($filters) {
                $q->where('name', $filters['role']);
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): User
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }

        // Remove roles array if present (not a fillable field)
        unset($data['roles']);

        $user->update($data);

        return $user->fresh();
    }
}
