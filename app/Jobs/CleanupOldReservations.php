<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\VehicleReservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CleanupOldReservations implements ShouldQueue
{
    use Queueable;

    public int $tries = 2;

    public int $timeout = 180;

    public function __construct(
        public readonly int $daysOld = 30,
        public readonly ?string $status = null
    ) {}

    public function handle(): void
    {
        try {
            $query = VehicleReservation::where('created_at', '<', now()->subDays($this->daysOld));

            if ($this->status) {
                $query->where('status', $this->status);
            }

            $reservations = $query->get();

            if ($reservations->isEmpty()) {
                Log::info('No old reservations to clean up');

                return;
            }

            $deletedCount = 0;

            foreach ($reservations as $reservation) {
                try {
                    $reservation->delete();
                    $deletedCount++;
                } catch (\Exception $e) {
                    Log::error("Failed to delete reservation {$reservation->id}: {$e->getMessage()}");
                }
            }

            Log::info("Cleaned up {$deletedCount} old reservations");
        } catch (\Exception $e) {
            Log::error("Cleanup job failed: {$e->getMessage()}");
            $this->release(60);
        }
    }
}
