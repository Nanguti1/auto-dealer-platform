<?php

declare(strict_types=1);

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateActivity implements ShouldQueue
{
    public function handle(object $event): void
    {
        // Listener intentionally delegates concrete side effects to queued infrastructure.
    }
}
