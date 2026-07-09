<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add audit columns to payments
        Schema::table('payments', function (Blueprint $table) {
            if (! Schema::hasColumn('payments', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('payments', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('payments', 'processed_by')) {
                $table->foreignId('processed_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('payments', 'processed_at')) {
                $table->timestamp('processed_at')->nullable()->after('processed_by');
            }
        });

        // Add audit columns to receipts
        Schema::table('receipts', function (Blueprint $table) {
            if (! Schema::hasColumn('receipts', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('receipts', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('receipts', 'issued_by')) {
                $table->foreignId('issued_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
        });

        // Add audit columns to refunds
        Schema::table('refunds', function (Blueprint $table) {
            if (! Schema::hasColumn('refunds', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('refunds', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('refunds', 'refunded_by')) {
                $table->foreignId('refunded_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
        });

        // Add audit columns to invoices
        Schema::table('invoices', function (Blueprint $table) {
            if (! Schema::hasColumn('invoices', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('invoices', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('invoices', 'approved_by')) {
                $table->foreignId('approved_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('invoices', 'approved_at')) {
                $table->timestamp('approved_at')->nullable()->after('approved_by');
            }
            if (! Schema::hasColumn('invoices', 'cancelled_by')) {
                $table->foreignId('cancelled_by')->nullable()->after('approved_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('invoices', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable()->after('cancelled_by');
            }
        });

        // Add audit columns to finance_applications
        Schema::table('finance_applications', function (Blueprint $table) {
            if (! Schema::hasColumn('finance_applications', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('finance_applications', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('finance_applications', 'approved_by')) {
                $table->foreignId('approved_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('finance_applications', 'approved_at')) {
                $table->timestamp('approved_at')->nullable()->after('approved_by');
            }
            if (! Schema::hasColumn('finance_applications', 'rejected_by')) {
                $table->foreignId('rejected_by')->nullable()->after('approved_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('finance_applications', 'rejected_at')) {
                $table->timestamp('rejected_at')->nullable()->after('rejected_by');
            }
        });

        // Add audit columns to vehicle_reservations
        Schema::table('vehicle_reservations', function (Blueprint $table) {
            if (! Schema::hasColumn('vehicle_reservations', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('vehicle_reservations', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('vehicle_reservations', 'confirmed_by')) {
                $table->foreignId('confirmed_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('vehicle_reservations', 'confirmed_at')) {
                $table->timestamp('confirmed_at')->nullable()->after('confirmed_by');
            }
            if (! Schema::hasColumn('vehicle_reservations', 'cancelled_by')) {
                $table->foreignId('cancelled_by')->nullable()->after('confirmed_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('vehicle_reservations', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable()->after('cancelled_by');
            }
        });

        // Add audit columns to import_payments
        Schema::table('import_payments', function (Blueprint $table) {
            if (! Schema::hasColumn('import_payments', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('updated_at')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('import_payments', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('import_payments', 'processed_by')) {
                $table->foreignId('processed_by')->nullable()->after('updated_by')->constrained('users')->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        $tables = ['payments', 'receipts', 'refunds', 'invoices', 'finance_applications', 'vehicle_reservations', 'import_payments'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table_schema) {
                $columns = Schema::getColumns($table_schema->getTable());
                $columnNames = array_column($columns, 'name');

                $auditable = ['created_by', 'updated_by', 'processed_by', 'issued_by', 'refunded_by', 'approved_by', 'approved_at', 'rejected_by', 'rejected_at', 'cancelled_by', 'cancelled_at', 'confirmed_by', 'confirmed_at', 'processed_at'];

                foreach ($auditable as $column) {
                    if (in_array($column, $columnNames)) {
                        try {
                            $table_schema->dropConstrainedForeignId($column);
                        } catch (\Exception $e) {
                            // Column doesn't have foreign key constraint, try dropping directly
                            if (in_array($column, $columnNames) && ! str_ends_with($column, '_at')) {
                                $table_schema->dropColumn($column);
                            }
                        }
                    }
                }
            });
        }
    }
};
