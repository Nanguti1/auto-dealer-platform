<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\BlogPublished;
use App\Events\CustomerRegistered;
use App\Events\DataExported;
use App\Events\FinanceApplicationSubmitted;
use App\Events\FinanceApproved;
use App\Events\ImportCompleted;
use App\Events\LeadAssigned;
use App\Events\LeadCreated;
use App\Events\PromotionCreated;
use App\Events\ReservationCreated;
use App\Events\RoleAssigned;
use App\Events\TradeInApproved;
use App\Events\TradeInSubmitted;
use App\Events\VehicleCreated;
use App\Events\VehicleDeleted;
use App\Events\VehicleSold;
use App\Events\VehicleUpdated;
use App\Listeners\DispatchEmails;
use App\Listeners\GenerateActivity;
use App\Listeners\LogPasswordReset;
use App\Listeners\LogUserLogin;
use App\Listeners\LogUserLogout;
use App\Listeners\RecordAuditLog;
use App\Listeners\SendNotification;
use App\Listeners\SyncSearchIndex;
use App\Listeners\UpdateAnalytics;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\PasswordReset;
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
            RecordAuditLog::class,
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
            RecordAuditLog::class,
        ],

        // Reservation Events
        ReservationCreated::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],

        // Lead Events
        LeadCreated::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],
        LeadAssigned::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],

        // Finance Events
        FinanceApplicationSubmitted::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],
        FinanceApproved::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],

        // Trade-In Events
        TradeInSubmitted::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],
        TradeInApproved::class => [
            SendNotification::class,
            GenerateActivity::class,
            RecordAuditLog::class,
        ],

        // Blog Events
        BlogPublished::class => [
            SyncSearchIndex::class,
            UpdateAnalytics::class,
            RecordAuditLog::class,
        ],

        // Promotion Events
        PromotionCreated::class => [
            UpdateAnalytics::class,
            SendNotification::class,
            RecordAuditLog::class,
        ],

        // Role & Permission Events
        RoleAssigned::class => [
            RecordAuditLog::class,
        ],

        // Import/Export Events
        ImportCompleted::class => [
            RecordAuditLog::class,
        ],
        DataExported::class => [
            RecordAuditLog::class,
        ],

        // Laravel Auth Events
        Login::class => [
            LogUserLogin::class,
        ],
        Logout::class => [
            LogUserLogout::class,
        ],
        PasswordReset::class => [
            LogPasswordReset::class,
        ],
        Registered::class => [
            SendEmailVerificationNotification::class,
            RecordAuditLog::class,
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
