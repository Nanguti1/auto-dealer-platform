<?php

use App\Http\Controllers\Admin\Analytics\AnalyticsController;
use App\Http\Controllers\Admin\Blog\BlogPostController;
use App\Http\Controllers\Admin\CMS\CmsPageController;
use App\Http\Controllers\Admin\CRM\LeadController;
use App\Http\Controllers\Admin\Customers\CustomerController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Financing\FinanceController;
use App\Http\Controllers\Admin\Imports\ImportController;
use App\Http\Controllers\Admin\Inventory\VehicleController;
use App\Http\Controllers\Admin\Payments\PaymentController;
use App\Http\Controllers\Admin\Promotions\PromotionController;
use App\Http\Controllers\Admin\Reservations\ReservationController;
use App\Http\Controllers\Admin\Reviews\ReviewController;
use App\Http\Controllers\Admin\Settings\SettingController;
use App\Http\Controllers\Admin\TradeIns\TradeInController;
use App\Http\Controllers\Admin\VehicleFeatures\VehicleFeatureController;
use App\Http\Controllers\Admin\VehicleGallery\VehicleGalleryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function (): void {
        Route::resource('dashboard', DashboardController::class)->only(['index']);
        Route::resource('vehicles', VehicleController::class);
        Route::patch('vehicles/{vehicle}/feature', [VehicleController::class, 'feature'])->name('vehicles.feature');
        Route::patch('vehicles/{vehicle}/unfeature', [VehicleController::class, 'unfeature'])->name('vehicles.unfeature');
        Route::patch('vehicles/{vehicle}/mark-sold', [VehicleController::class, 'markSold'])->name('vehicles.mark-sold');
        Route::post('vehicles/{vehicle}/duplicate', [VehicleController::class, 'duplicate'])->name('vehicles.duplicate');
        Route::resource('vehicle-galleries', VehicleGalleryController::class);
        Route::resource('vehicle-features', VehicleFeatureController::class);
        Route::resource('customers', CustomerController::class);
        Route::resource('leads', LeadController::class);
        Route::resource('trade-ins', TradeInController::class);
        Route::resource('finance-applications', FinanceController::class);
        Route::resource('reservations', ReservationController::class);
        Route::resource('imports', ImportController::class);
        Route::resource('payments', PaymentController::class);
        Route::resource('blog-posts', BlogPostController::class);
        Route::resource('reviews', ReviewController::class);
        Route::resource('promotions', PromotionController::class);
        Route::resource('cms-pages', CmsPageController::class);
        Route::resource('analytics', AnalyticsController::class)->only(['index', 'show']);
        Route::resource('settings', SettingController::class)->except(['show']);
    });

require __DIR__.'/settings.php';