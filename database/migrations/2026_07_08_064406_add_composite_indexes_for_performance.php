<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Vehicles composite indexes for common query patterns
        Schema::table('vehicles', function (Blueprint $table) {
            // For dashboard inventory by status queries
            $table->index(['branch_id', 'inventory_status_id'], 'vehicles_branch_inventory_status_index');
            // For featured vehicles filtering
            $table->index(['is_featured', 'sold_at', 'listed_at'], 'vehicles_featured_sales_listed_index');
            // For recent arrivals filtering
            $table->index(['listed_at', 'sold_at'], 'vehicles_listed_sold_index');
        });

        // Leads composite indexes for CRM and reporting queries
        Schema::table('leads', function (Blueprint $table) {
            // For pipeline stage queries
            $table->index(['crm_stage_id', 'status'], 'leads_stage_status_index');
            // For user assignment queries
            $table->index(['assigned_user_id', 'status'], 'leads_assigned_status_index');
            // For time-based lead reports
            $table->index(['created_at', 'status'], 'leads_created_status_index');
            // For vehicle-specific lead queries
            $table->index(['vehicle_id', 'status'], 'leads_vehicle_status_index');
        });

        // Payments composite indexes for reporting and filtering
        Schema::table('payments', function (Blueprint $table) {
            // For vehicle payment history
            $table->index(['vehicle_id', 'status'], 'payments_vehicle_status_index');
            // For user payment history
            $table->index(['user_id', 'status'], 'payments_user_status_index');
            // For time-based payment reports
            $table->index(['created_at', 'status'], 'payments_created_status_index');
            // For vehicle sales data
            $table->index(['vehicle_id', 'created_at'], 'payments_vehicle_created_index');
        });

        // Invoices composite indexes for filtering and reporting
        Schema::table('invoices', function (Blueprint $table) {
            // For user invoice filtering
            $table->index(['user_id', 'status'], 'invoices_user_status_index');
            // For vehicle invoice filtering
            $table->index(['vehicle_id', 'status'], 'invoices_vehicle_status_index');
            // For payment-invoice relationship (only if payment_id column exists)
            if (Schema::hasColumn('invoices', 'payment_id')) {
                $table->index(['payment_id', 'status'], 'invoices_payment_status_index');
            }
            // For time-based invoice reports
            $table->index(['issued_at', 'status'], 'invoices_issued_status_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Vehicles composite indexes
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropIndex('vehicles_branch_inventory_status_index');
            $table->dropIndex('vehicles_featured_sales_listed_index');
            $table->dropIndex('vehicles_listed_sold_index');
        });

        // Leads composite indexes
        Schema::table('leads', function (Blueprint $table) {
            $table->dropIndex('leads_stage_status_index');
            $table->dropIndex('leads_assigned_status_index');
            $table->dropIndex('leads_created_status_index');
            $table->dropIndex('leads_vehicle_status_index');
        });

        // Payments composite indexes
        Schema::table('payments', function (Blueprint $table) {
            $table->dropIndex('payments_vehicle_status_index');
            $table->dropIndex('payments_user_status_index');
            $table->dropIndex('payments_created_status_index');
            $table->dropIndex('payments_vehicle_created_index');
        });

        // Invoices composite indexes
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropIndex('invoices_user_status_index');
            $table->dropIndex('invoices_vehicle_status_index');
            // Only drop if it exists
            if (Schema::hasIndex('invoices', 'invoices_payment_status_index')) {
                $table->dropIndex('invoices_payment_status_index');
            }
            $table->dropIndex('invoices_issued_status_index');
        });
    }
};
