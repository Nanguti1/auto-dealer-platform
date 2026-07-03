<?php

declare(strict_types=1);

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CleanupOldReservations implements ShouldQueue
{
    use Queueable;

    /** @param array<string, mixed> $payload */
    public function __construct(public readonly array $payload = []) {}

    public function handle(): void
    {
        // Expensive workflow is queued and can be expanded per integration.
    }
}
