<?php

declare(strict_types=1);

namespace App\Services\Customers;

use App\Models\CustomerNote;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class CustomerNoteService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return CustomerNote::class;
    }

    public function paginateForCustomer(int $customerId, array $filters = []): LengthAwarePaginator
    {
        $query = CustomerNote::query()
            ->where('customer_id', $customerId)
            ->with('user');

        if (isset($filters['is_private'])) {
            $query->where('is_private', $filters['is_private']);
        }

        return $query->latest()->paginate($filters['per_page'] ?? 15);
    }
}
