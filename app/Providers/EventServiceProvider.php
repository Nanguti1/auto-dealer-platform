<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\BlogPublished;
use App\Events\CustomerRegistered;
use App\Events\FinanceApplicationSubmitted;
use App\Events\FinanceApproved;
use App\Events\LeadAssigned;
use App\Events\LeadCreated;
use App\Events\PromotionCreated;
use App\Events\ReservationCreated;
use App\Events\TradeInApproved;
use App\Events\TradeInSubmitted;
use App\Events\VehicleCreated;
use App\Events\VehicleDeleted;
use App\Events\VehicleSold;
use App\Events\VehicleUpdated;
use App\Listeners\DispatchEmails;
use App\Listeners\GenerateActivity;
use App\Listeners\RecordAuditLog;
use App\Listeners\SendNotification;
use App\Listeners\SyncSearchIndex;
use App\Listeners\UpdateAnalytics;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<string, array<int, string>>
     */
    protected $listen = [
        // Customer Events
        CustomerRegistered::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],

        // Vehicle Events
        VehicleCreated::class => [
            SyncSearchIndex::class,
            RecordAuditLog::class,
        ],
        VehicleUpdated::class => [
            SyncSearchIndex::class,
            RecordAuditLog::class,
        ],
        VehicleDeleted::class => [
            SyncSearchIndex::class,
            RecordAuditLog::class,
        ],
        VehicleSold::class => [
            UpdateAnalytics::class,
            GenerateActivity::class,
            DispatchEmails::class,
        ],

        // Reservation Events
        ReservationCreated::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],

        // Lead Events
        LeadCreated::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],
        LeadAssigned::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],

        // Finance Events
        FinanceApplicationSubmitted::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],
        FinanceApproved::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],

        // Trade-In Events
        TradeInSubmitted::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],
        TradeInApproved::class => [
            SendNotification::class,
            GenerateActivity::class,
        ],

        // Blog Events
        BlogPublished::class => [
            SyncSearchIndex::class,
            UpdateAnalytics::class,
        ],

        // Promotion Events
        PromotionCreated::class => [
            UpdateAnalytics::class,
            SendNotification::class,
        ],

        // Laravel Auth Events
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }
}
