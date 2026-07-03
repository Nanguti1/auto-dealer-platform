<?php

namespace App\Console\Commands;

use App\Jobs\CleanupOldReservations;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('cleanup:reservations {--days=30 : Age of reservations to clean up} {--status= : Only clean up reservations with specific status}')]
#[Description('Clean up old reservations from the database')]
class CleanupReservations extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $days = (int) $this->option('days');
        $status = $this->option('status');

        $this->info("Dispatching cleanup job for reservations older than {$days} days".($status ? " with status: {$status}" : ''));

        CleanupOldReservations::dispatch($days, $status ?: null);

        $this->info('Cleanup job dispatched successfully.');

        return Command::SUCCESS;
    }
}
