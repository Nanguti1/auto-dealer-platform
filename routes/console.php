<?php

use App\Jobs\GenerateReports;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule periodic cleanup of old reservations (daily at 2 AM)
Schedule::command('cleanup:reservations --days=30')
    ->dailyAt('02:00')
    ->description('Clean up reservations older than 30 days');

// Schedule monthly sales report generation (1st of each month at 3 AM)
Schedule::call(function () {
    GenerateReports::dispatch('sales', [
        'start_date' => now()->subMonth()->startOfMonth()->toIso8601String(),
        'end_date' => now()->subMonth()->endOfMonth()->toIso8601String(),
    ]);
})->monthlyOn(1, '03:00')->description('Generate monthly sales report');

// Schedule weekly inventory report (every Sunday at 4 AM)
Schedule::call(function () {
    GenerateReports::dispatch('inventory');
})->weeklyOn(0, '04:00')->description('Generate weekly inventory report');

// Schedule queue health check (every 6 hours)
Schedule::command('queue:monitor')
    ->everySixHours()
    ->description('Monitor queue health');
