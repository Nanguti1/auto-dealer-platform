<?php

declare(strict_types=1);

namespace App\Services\Sales;

use App\Models\Invoice;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class InvoiceService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return Invoice::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Invoice::query()->with(['vehicle', 'payment', 'user']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('invoice_number', 'like', '%'.$filters['search'].'%');
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

    public function generateInvoiceNumber(): string
    {
        $prefix = 'INV-';
        $latest = Invoice::query()->where('invoice_number', 'like', $prefix.'%')
            ->orderBy('invoice_number', 'desc')
            ->value('invoice_number');

        if ($latest) {
            $number = (int) str_replace($prefix, '', $latest);
            $number++;
        } else {
            $number = 1;
        }

        return $prefix.str_pad((string) $number, 6, '0', STR_PAD_LEFT);
    }

    public function create(array $data): Invoice
    {
        if (! isset($data['invoice_number'])) {
            $data['invoice_number'] = $this->generateInvoiceNumber();
        }

        return parent::create($data);
    }
}
