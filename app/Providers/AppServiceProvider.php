<?php

namespace App\Providers;

use App\Models\FinanceApplication;
use App\Models\ImportPayment;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\Refund;
use App\Models\Setting;
use App\Models\User;
use App\Models\VehicleReservation;
use App\Observers\FinanceApplicationObserver;
use App\Observers\ImportPaymentObserver;
use App\Observers\InvoiceObserver;
use App\Observers\PaymentObserver;
use App\Observers\ReceiptObserver;
use App\Observers\RefundObserver;
use App\Observers\SettingObserver;
use App\Observers\UserObserver;
use App\Observers\VehicleReservationObserver;
use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->registerObservers();
        $this->configureRateLimiting();
    }

    /**
     * Register model observers for audit logging.
     */
    protected function registerObservers(): void
    {
        User::observe(UserObserver::class);
        Setting::observe(SettingObserver::class);

        // Financial audit trail observers
        Payment::observe(PaymentObserver::class);
        Receipt::observe(ReceiptObserver::class);
        Refund::observe(RefundObserver::class);
        Invoice::observe(InvoiceObserver::class);
        FinanceApplication::observe(FinanceApplicationObserver::class);
        VehicleReservation::observe(VehicleReservationObserver::class);
        ImportPayment::observe(ImportPaymentObserver::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    /**
     * Configure rate limiters for sensitive endpoints.
     */
    protected function configureRateLimiting(): void
    {
        // Login rate limiting: 5 attempts per minute per email/IP combination
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip().':'.$request->input('email'));
        });

        // Registration rate limiting: 3 attempts per hour per IP
        RateLimiter::for('registration', function (Request $request) {
            return Limit::perHour(3)->by($request->ip());
        });

        // Contact form rate limiting: 10 submissions per minute per email/IP combination
        RateLimiter::for('contact', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip().':'.$request->input('email'));
        });

        // Lead submission rate limiting: 5 submissions per minute per IP
        RateLimiter::for('leads', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        // Trade-in request rate limiting: 3 requests per hour per IP
        RateLimiter::for('trade-in', function (Request $request) {
            return Limit::perHour(3)->by($request->ip());
        });

        // Import request rate limiting: 3 requests per hour per IP
        RateLimiter::for('import', function (Request $request) {
            return Limit::perHour(3)->by($request->ip());
        });

        // Password reset rate limiting: 3 attempts per hour per email/IP
        RateLimiter::for('password-reset', function (Request $request) {
            return Limit::perHour(3)->by($request->ip().':'.$request->input('email'));
        });

        // Customer actions rate limiting: 60 actions per minute per authenticated user
        RateLimiter::for('customer-actions', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
