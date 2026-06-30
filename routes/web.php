<?php

use App\Http\Controllers\Admin\Analytics\AnalyticsController;
use App\Http\Controllers\Admin\Blog\BlogCategoryController;
use App\Http\Controllers\Admin\Blog\BlogPostController;
use App\Http\Controllers\Admin\Blog\BlogTagController;
use App\Http\Controllers\Admin\CMS\CmsPageController;
use App\Http\Controllers\Admin\CMS\FaqController;
use App\Http\Controllers\Admin\CMS\HeroSliderController;
use App\Http\Controllers\Admin\CMS\HomePageSectionController;
use App\Http\Controllers\Admin\CMS\MediaController;
use App\Http\Controllers\Admin\CMS\SeoMetadataController;
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
use App\Http\Controllers\Admin\Users\PermissionController;
use App\Http\Controllers\Admin\Users\RoleController;
use App\Http\Controllers\Admin\Users\UserController;
use App\Http\Controllers\Admin\VehicleFeatures\VehicleFeatureController;
use App\Http\Controllers\Admin\VehicleGallery\VehicleGalleryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('about', 'public/about')->name('about');
Route::inertia('contact', 'public/contact')->name('contact');
Route::inertia('faq', 'public/faq')->name('faq');
Route::inertia('testimonials', 'public/testimonials')->name('testimonials');
Route::inertia('privacy', 'public/privacy')->name('privacy');
Route::inertia('terms', 'public/terms')->name('terms');
Route::inertia('newsletter', 'public/newsletter')->name('newsletter');
Route::inertia('search', 'search-results')->name('search');
Route::inertia('blog', 'blog-index')->name('blog.index');
Route::inertia('blog/{slug}', 'blog-show')->name('blog.show');
Route::inertia('inventory', 'inventory/index')->name('inventory.index');
Route::inertia('inventory/compare', 'inventory/compare')->name('inventory.compare');
Route::inertia('inventory/{slug}', 'inventory/show')->name('inventory.show');
Route::inertia('finance/calculator', 'finance/calculator')->name('finance.calculator');
Route::inertia('trade-in/request', 'trade-in/request')->name('trade-in.request');
Route::inertia('import/request', 'import/request')->name('import.request');
Route::inertia('contact/dealer', 'contact/dealer')->name('contact.dealer');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('customer/dashboard', 'customer/dashboard')->name('customer.dashboard');
    Route::inertia('customer/wishlist', 'customer/wishlist')->name('customer.wishlist');
    Route::inertia('customer/saved-searches', 'customer/saved-searches')->name('customer.saved-searches');
    Route::inertia('customer/recently-viewed', 'customer/recently-viewed')->name('customer.recently-viewed');
    Route::inertia('customer/reservations', 'customer/reservations')->name('customer.reservations');
    Route::inertia('customer/bookings', 'customer/bookings')->name('customer.bookings');
    Route::inertia('customer/notifications', 'customer/notifications')->name('customer.notifications');
    Route::inertia('customer/profile', 'customer/profile')->name('customer.profile');
    Route::inertia('customer/settings', 'customer/settings')->name('customer.settings');
    Route::inertia('customer/trade-ins', 'customer/trade-ins')->name('customer.trade-ins');
    Route::inertia('customer/finance-applications', 'customer/finance-applications')->name('customer.finance-applications');
    Route::inertia('customer/import-requests', 'customer/import-requests')->name('customer.import-requests');
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
        Route::resource('blog-categories', BlogCategoryController::class);
        Route::resource('blog-tags', BlogTagController::class);
        Route::resource('blog-posts', BlogPostController::class);
        Route::resource('reviews', ReviewController::class);
        Route::resource('promotions', PromotionController::class);
        Route::resource('cms-pages', CmsPageController::class);
        Route::resource('faqs', FaqController::class);
        Route::resource('hero-sliders', HeroSliderController::class);
        Route::resource('home-page-sections', HomePageSectionController::class);
        Route::resource('media', MediaController::class);
        Route::resource('seo-metadata', SeoMetadataController::class);
        Route::resource('analytics', AnalyticsController::class)->only(['index', 'show']);
        Route::resource('settings', SettingController::class)->except(['show']);
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
    });

require __DIR__.'/settings.php';
