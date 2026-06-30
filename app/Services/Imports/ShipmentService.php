<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Models\ImportShipment;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Pagination\LengthAwarePaginator;

class ShipmentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return ImportShipment::class;
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = ImportShipment::query()->with(['vehicleImport']);

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('tracking_number', 'like', '%'.$filters['search'].'%')
                    ->orWhere('carrier', 'like', '%'.$filters['search'].'%');
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

    public function updateTracking(ImportShipment $shipment, array $data): ImportShipment
    {
        $shipment->update($data);

        return $shipment->fresh();
    }

    public function markAsDelivered(ImportShipment $shipment): ImportShipment
    {
        $shipment->update([
            'status' => 'delivered',
            'actual_arrival' => now(),
        ]);

        return $shipment->fresh();
    }
}
