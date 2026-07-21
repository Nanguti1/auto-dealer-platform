<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Jobs\ImportVehicles;
use App\Models\VehicleImport;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ImportService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return VehicleImport::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = VehicleImport::query()->with(['user', 'customer', 'supplier', 'vehicle', 'documents', 'shipments', 'payments']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('reference_number', 'like', '%'.$filters['search'].'%')
                    ->orWhere('origin_country', 'like', '%'.$filters['search'].'%');
            });
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 15);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): VehicleImport
    {
        // Use the trait's create method
        /** @var VehicleImport $import */
        $import = $this->modelClass()::query()->create($data);

        // Dispatch import processing job asynchronously
        ImportVehicles::dispatch($import);

        return $import;
    }
}
