<?php

declare(strict_types=1);

namespace App\Services\Sales;

use App\Models\Refund;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class RefundService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Refund::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Refund::query()->with(['payment', 'invoice', 'user']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('refund_number', 'like', '%'.$filters['search'].'%');
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

    public function generateRefundNumber(): string
    {
        $prefix = 'REF-';
        $latest = Refund::query()->where('refund_number', 'like', $prefix.'%')
            ->orderBy('refund_number', 'desc')
            ->value('refund_number');

        if ($latest) {
            $number = (int) str_replace($prefix, '', $latest);
            $number++;
        } else {
            $number = 1;
        }

        return $prefix.str_pad((string) $number, 6, '0', STR_PAD_LEFT);
    }

    public function create(array $data): Refund
    {
        if (! isset($data['refund_number'])) {
            $data['refund_number'] = $this->generateRefundNumber();
        }

        return DB::transaction(fn (): Refund => Refund::query()->create($data));
    }

    public function process(Refund $refund): Refund
    {
        $refund->update([
            'status' => 'processed',
            'processed_at' => now(),
        ]);

        return $refund->fresh();
    }
}
