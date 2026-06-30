<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Models\ImportPayment;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ImportPaymentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return ImportPayment::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = ImportPayment::query()->with(['vehicleImport', 'payment']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('payment_reference', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['vehicle_import_id'])) {
            $query->where('vehicle_import_id', $filters['vehicle_import_id']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function markAsPaid(ImportPayment $importPayment): ImportPayment
    {
        $importPayment->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return $importPayment->fresh();
    }
}
