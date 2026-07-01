<?php

use App\Http\Controllers\Admin\Admin\AuditLogController;
use App\Http\Controllers\Admin\Analytics\AnalyticsController;
use App\Http\Controllers\Admin\Blog\BlogCategoryController;
use App\Http\Controllers\Admin\Blog\BlogPostController;
use App\Http\Controllers\Admin\Blog\BlogTagController;
use App\Http\Controllers\Admin\Branches\BranchController;
use App\Http\Controllers\Admin\CMS\CmsPageController;
use App\Http\Controllers\Admin\CMS\FaqController;
use App\Http\Controllers\Admin\CMS\HeroSliderController;
use App\Http\Controllers\Admin\CMS\HomePageSectionController;
use App\Http\Controllers\Admin\CMS\MediaController;
use App\Http\Controllers\Admin\CMS\SeoMetadataController;
use App\Http\Controllers\Admin\CRM\ActivityController;
use App\Http\Controllers\Admin\CRM\LeadController;
use App\Http\Controllers\Admin\CRM\PipelineController;
use App\Http\Controllers\Admin\CRM\TaskController;
use App\Http\Controllers\Admin\Customers\CustomerController;
use App\Http\Controllers\Admin\Customers\DocumentController;
use App\Http\Controllers\Admin\Customers\NoteController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Financing\FinanceController;
use App\Http\Controllers\Admin\Financing\FinanceDocumentController;
use App\Http\Controllers\Admin\Imports\ImportController;
use App\Http\Controllers\Admin\Imports\ImportDocumentController;
use App\Http\Controllers\Admin\Imports\ImportPaymentController;
use App\Http\Controllers\Admin\Imports\ShipmentController;
use App\Http\Controllers\Admin\Inventory\VehicleController;
use App\Http\Controllers\Admin\Payments\PaymentController;
use App\Http\Controllers\Admin\Promotions\PromotionController;
use App\Http\Controllers\Admin\Reports\ReportController;
use App\Http\Controllers\Admin\Reservations\ReservationController;
use App\Http\Controllers\Admin\Reviews\ReviewController;
use App\Http\Controllers\Admin\Sales\InvoiceController;
use App\Http\Controllers\Admin\Sales\ReceiptController;
use App\Http\Controllers\Admin\Sales\RefundController;
use App\Http\Controllers\Admin\Settings\SettingController;
use App\Http\Controllers\Admin\TradeIns\InspectionController;
use App\Http\Controllers\Admin\TradeIns\OfferController;
use App\Http\Controllers\Admin\TradeIns\TradeInController;
use App\Http\Controllers\Admin\TradeIns\ValuationController;
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
        Route::resource('branches', BranchController::class);
        Route::resource('vehicles', VehicleController::class);
        Route::patch('vehicles/{vehicle}/feature', [VehicleController::class, 'feature'])->name('vehicles.feature');
        Route::patch('vehicles/{vehicle}/unfeature', [VehicleController::class, 'unfeature'])->name('vehicles.unfeature');
        Route::patch('vehicles/{vehicle}/mark-sold', [VehicleController::class, 'markSold'])->name('vehicles.mark-sold');
        Route::post('vehicles/{vehicle}/duplicate', [VehicleController::class, 'duplicate'])->name('vehicles.duplicate');
        Route::resource('vehicle-galleries', VehicleGalleryController::class);
        Route::resource('vehicle-features', VehicleFeatureController::class);
        Route::resource('customers', CustomerController::class);
        Route::prefix('customers/{customer}')->group(function (): void {
            Route::resource('documents', DocumentController::class)->only(['index', 'create', 'store', 'show', 'destroy'])->names([
                'index' => 'customers.documents.index',
                'create' => 'customers.documents.create',
                'store' => 'customers.documents.store',
                'show' => 'customers.documents.show',
                'destroy' => 'customers.documents.destroy',
            ]);
            Route::resource('notes', NoteController::class);
        });
        Route::resource('leads', LeadController::class);
        Route::resource('activities', ActivityController::class);
        Route::resource('tasks', TaskController::class);
        Route::get('pipeline', [PipelineController::class, 'index'])->name('pipeline.index');
        Route::patch('leads/{lead}/stage', [PipelineController::class, 'updateStage'])->name('leads.update-stage');
        Route::resource('trade-ins', TradeInController::class);
        Route::resource('inspections', InspectionController::class);
        Route::patch('inspections/{inspection}/complete', [InspectionController::class, 'complete'])->name('inspections.complete');
        Route::resource('offers', OfferController::class);
        Route::patch('offers/{offer}/accept', [OfferController::class, 'accept'])->name('offers.accept');
        Route::patch('offers/{offer}/reject', [OfferController::class, 'reject'])->name('offers.reject');
        Route::resource('valuations', ValuationController::class);
        Route::resource('finance-applications', FinanceController::class);
        Route::prefix('finance-applications/{financeApplication}')->group(function (): void {
            Route::resource('documents', FinanceDocumentController::class)->only(['index', 'create', 'store', 'show', 'destroy'])->names([
                'index' => 'finance-applications.documents.index',
                'create' => 'finance-applications.documents.create',
                'store' => 'finance-applications.documents.store',
                'show' => 'finance-applications.documents.show',
                'destroy' => 'finance-applications.documents.destroy',
            ]);
        });
        Route::resource('reservations', ReservationController::class);
        Route::resource('imports', ImportController::class);
        Route::prefix('imports/{vehicleImport}')->group(function (): void {
            Route::resource('documents', ImportDocumentController::class)->only(['index', 'create', 'store', 'show', 'destroy'])->names([
                'index' => 'imports.documents.index',
                'create' => 'imports.documents.create',
                'store' => 'imports.documents.store',
                'show' => 'imports.documents.show',
                'destroy' => 'imports.documents.destroy',
            ]);
        });
        Route::resource('shipments', ShipmentController::class);
        Route::patch('shipments/{shipment}/update-tracking', [ShipmentController::class, 'updateTracking'])->name('shipments.update-tracking');
        Route::patch('shipments/{shipment}/mark-as-delivered', [ShipmentController::class, 'markAsDelivered'])->name('shipments.mark-as-delivered');
        Route::resource('import-payments', ImportPaymentController::class);
        Route::patch('import-payments/{importPayment}/mark-as-paid', [ImportPaymentController::class, 'markAsPaid'])->name('import-payments.mark-as-paid');
        Route::resource('payments', PaymentController::class);
        Route::resource('invoices', InvoiceController::class);
        Route::resource('receipts', ReceiptController::class);
        Route::resource('refunds', RefundController::class);
        Route::patch('refunds/{refund}/process', [RefundController::class, 'process'])->name('refunds.process');
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
        Route::prefix('reports')->group(function (): void {
            Route::get('/', [ReportController::class, 'index'])->name('reports.index');
            Route::get('/sales', [ReportController::class, 'sales'])->name('reports.sales');
            Route::get('/inventory', [ReportController::class, 'inventory'])->name('reports.inventory');
            Route::get('/leads', [ReportController::class, 'leads'])->name('reports.leads');
            Route::get('/finance', [ReportController::class, 'finance'])->name('reports.finance');
            Route::post('/', [ReportController::class, 'store'])->name('reports.store');
            Route::delete('/{report}', [ReportController::class, 'destroy'])->name('reports.destroy');
            Route::get('/export', [ReportController::class, 'export'])->name('reports.export');
        });
        Route::resource('settings', SettingController::class)->except(['show']);
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('audit-logs', AuditLogController::class)->only(['index', 'show']);
        Route::get('audit-logs/export', [AuditLogController::class, 'export'])->name('audit-logs.export');
    });

require __DIR__.'/settings.php';
