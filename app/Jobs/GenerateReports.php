<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\FinanceApplication;
use App\Models\TradeInRequest;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GenerateReports implements ShouldQueue
{
    use Queueable;

    public int $tries = 2;

    public int $timeout = 600;

    public function __construct(
        public readonly string $reportType,
        public readonly array $filters = [],
        public readonly ?int $userId = null
    ) {}

    public function handle(): void
    {
        try {
            $reportData = match ($this->reportType) {
                'sales' => $this->generateSalesReport(),
                'inventory' => $this->generateInventoryReport(),
                'reservations' => $this->generateReservationsReport(),
                'trade_ins' => $this->generateTradeInsReport(),
                'finance' => $this->generateFinanceReport(),
                default => throw new \InvalidArgumentException("Unknown report type: {$this->reportType}"),
            };

            $filename = "{$this->reportType}_report_".now()->format('Y_m_d_His').'.json';
            $path = "reports/{$filename}";

            Storage::disk('local')->put($path, json_encode($reportData, JSON_PRETTY_PRINT));

            Log::info("Report generated: {$filename}");
        } catch (\Exception $e) {
            Log::error("Failed to generate {$this->reportType} report: {$e->getMessage()}");
            $this->release(120);
        }
    }

    private function generateSalesReport(): array
    {
        $startDate = $this->filters['start_date'] ?? now()->subMonth()->startOfMonth();
        $endDate = $this->filters['end_date'] ?? now()->subMonth()->endOfMonth();

        $soldVehicles = Vehicle::whereBetween('sold_at', [$startDate, $endDate])
            ->with(['make', 'vehicleModel', 'owner'])
            ->get();

        return [
            'report_type' => 'sales',
            'period' => [
                'start_date' => $startDate->toIso8601String(),
                'end_date' => $endDate->toIso8601String(),
            ],
            'summary' => [
                'total_sales' => $soldVehicles->count(),
                'total_revenue' => $soldVehicles->sum('sale_price'),
                'average_sale_price' => $soldVehicles->avg('sale_price'),
            ],
            'by_make' => $soldVehicles->groupBy('make.name')->map(fn ($group) => [
                'count' => $group->count(),
                'revenue' => $group->sum('sale_price'),
            ]),
            'sales' => $soldVehicles->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'vin' => $vehicle->vin,
                'make' => $vehicle->make->name,
                'model' => $vehicle->vehicleModel->name,
                'year' => $vehicle->year,
                'sale_price' => $vehicle->sale_price,
                'sold_at' => $vehicle->sold_at?->toIso8601String(),
                'sold_to' => $vehicle->owner?->name,
            ]),
        ];
    }

    private function generateInventoryReport(): array
    {
        $vehicles = Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
            ->get();

        return [
            'report_type' => 'inventory',
            'generated_at' => now()->toIso8601String(),
            'summary' => [
                'total_vehicles' => $vehicles->count(),
                'by_status' => $vehicles->groupBy('inventoryStatus.name')->map(fn ($group) => [
                    'count' => $group->count(),
                ]),
                'by_make' => $vehicles->groupBy('make.name')->map(fn ($group) => [
                    'count' => $group->count(),
                ]),
            ],
            'vehicles' => $vehicles->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'stock_number' => $vehicle->stock_number,
                'vin' => $vehicle->vin,
                'make' => $vehicle->make->name,
                'model' => $vehicle->vehicleModel->name,
                'year' => $vehicle->year,
                'status' => $vehicle->inventoryStatus->name,
                'sale_price' => $vehicle->sale_price,
                'listed_at' => $vehicle->listed_at?->toIso8601String(),
            ]),
        ];
    }

    private function generateReservationsReport(): array
    {
        $startDate = $this->filters['start_date'] ?? now()->subMonth()->startOfMonth();
        $endDate = $this->filters['end_date'] ?? now()->subMonth()->endOfMonth();

        $reservations = VehicleReservation::whereBetween('created_at', [$startDate, $endDate])
            ->with(['vehicle', 'user'])
            ->get();

        return [
            'report_type' => 'reservations',
            'period' => [
                'start_date' => $startDate->toIso8601String(),
                'end_date' => $endDate->toIso8601String(),
            ],
            'summary' => [
                'total_reservations' => $reservations->count(),
                'by_status' => $reservations->groupBy('status')->map(fn ($group) => [
                    'count' => $group->count(),
                ]),
            ],
            'reservations' => $reservations->map(fn ($reservation) => [
                'id' => $reservation->id,
                'vehicle' => $reservation->vehicle->vin,
                'customer' => $reservation->user->name,
                'status' => $reservation->status,
                'created_at' => $reservation->created_at->toIso8601String(),
            ]),
        ];
    }

    private function generateTradeInsReport(): array
    {
        $startDate = $this->filters['start_date'] ?? now()->subMonth()->startOfMonth();
        $endDate = $this->filters['end_date'] ?? now()->subMonth()->endOfMonth();

        $tradeIns = TradeInRequest::whereBetween('created_at', [$startDate, $endDate])
            ->with(['vehicle', 'user'])
            ->get();

        return [
            'report_type' => 'trade_ins',
            'period' => [
                'start_date' => $startDate->toIso8601String(),
                'end_date' => $endDate->toIso8601String(),
            ],
            'summary' => [
                'total_trade_ins' => $tradeIns->count(),
                'by_status' => $tradeIns->groupBy('status')->map(fn ($group) => [
                    'count' => $group->count(),
                ]),
            ],
            'trade_ins' => $tradeIns->map(fn ($tradeIn) => [
                'id' => $tradeIn->id,
                'vehicle' => $tradeIn->vehicle?->vin,
                'customer' => $tradeIn->user->name,
                'status' => $tradeIn->status,
                'estimated_value' => $tradeIn->estimated_value,
                'created_at' => $tradeIn->created_at->toIso8601String(),
            ]),
        ];
    }

    private function generateFinanceReport(): array
    {
        $startDate = $this->filters['start_date'] ?? now()->subMonth()->startOfMonth();
        $endDate = $this->filters['end_date'] ?? now()->subMonth()->endOfMonth();

        $applications = FinanceApplication::whereBetween('created_at', [$startDate, $endDate])
            ->with(['vehicle', 'user'])
            ->get();

        return [
            'report_type' => 'finance',
            'period' => [
                'start_date' => $startDate->toIso8601String(),
                'end_date' => $endDate->toIso8601String(),
            ],
            'summary' => [
                'total_applications' => $applications->count(),
                'by_status' => $applications->groupBy('status')->map(fn ($group) => [
                    'count' => $group->count(),
                ]),
                'total_amount_requested' => $applications->sum('loan_amount'),
            ],
            'applications' => $applications->map(fn ($application) => [
                'id' => $application->id,
                'vehicle' => $application->vehicle?->vin,
                'customer' => $application->user->name,
                'status' => $application->status,
                'loan_amount' => $application->loan_amount,
                'created_at' => $application->created_at->toIso8601String(),
            ]),
        ];
    }
}
