<?php

declare(strict_types=1);

namespace App\Services\Sales;

use App\Models\Receipt;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ReceiptService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Receipt::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Receipt::query()->with(['payment', 'invoice', 'user']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('receipt_number', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function generateReceiptNumber(): string
    {
        $prefix = 'RCP-';
        $latest = Receipt::query()->where('receipt_number', 'like', $prefix.'%')
            ->orderBy('receipt_number', 'desc')
            ->value('receipt_number');

        if ($latest) {
            $number = (int) str_replace($prefix, '', $latest);
            $number++;
        } else {
            $number = 1;
        }

        return $prefix.str_pad((string) $number, 6, '0', STR_PAD_LEFT);
    }

    public function create(array $data): Receipt
    {
        if (! isset($data['receipt_number'])) {
            $data['receipt_number'] = $this->generateReceiptNumber();
        }

        if (! isset($data['issued_at'])) {
            $data['issued_at'] = now();
        }

        return parent::create($data);
    }
}
