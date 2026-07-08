<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Add nullable branch_id columns to financial tables
        Schema::table('payments', function (Blueprint $table) {
            if (! Schema::hasColumn('payments', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('receipts', function (Blueprint $table) {
            if (! Schema::hasColumn('receipts', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('refunds', function (Blueprint $table) {
            if (! Schema::hasColumn('refunds', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('finance_applications', function (Blueprint $table) {
            if (! Schema::hasColumn('finance_applications', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('vehicle_reservations', function (Blueprint $table) {
            if (! Schema::hasColumn('vehicle_reservations', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('import_payments', function (Blueprint $table) {
            if (! Schema::hasColumn('import_payments', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        Schema::table('vehicle_imports', function (Blueprint $table) {
            if (! Schema::hasColumn('vehicle_imports', 'branch_id')) {
                $table->foreignId('branch_id')->nullable()->after('id')->constrained()->nullOnDelete();
                $table->index('branch_id');
            }
        });

        // Backfill branch_id values in a safe, chunked manner
        // Preference order: vehicle.branch_id -> invoice.branch_id -> vehicle_import.branch_id -> user.branch_id

        // Backfill payments
        DB::table('payments')->orderBy('id')->chunkById(500, function ($rows) {
            $vehicleIds = [];
            $invoiceIds = [];
            $userIds = [];

            foreach ($rows as $r) {
                if ($r->vehicle_id) $vehicleIds[] = $r->vehicle_id;
                if ($r->invoice_id) $invoiceIds[] = $r->invoice_id;
                if ($r->user_id) $userIds[] = $r->user_id;
            }

            $vehicleBranchMap = [];
            if (count($vehicleIds) > 0) {
                $vehicleBranchMap = DB::table('vehicles')->whereIn('id', array_unique($vehicleIds))->pluck('branch_id','id')->toArray();
            }

            $invoiceBranchMap = [];
            if (count($invoiceIds) > 0) {
                $invoiceBranchMap = DB::table('invoices')->whereIn('id', array_unique($invoiceIds))->pluck('branch_id','id')->toArray();
            }

            $userBranchMap = [];
            if (count($userIds) > 0) {
                $userBranchMap = DB::table('users')->whereIn('id', array_unique($userIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->vehicle_id && isset($vehicleBranchMap[$r->vehicle_id])) {
                    $branchId = $vehicleBranchMap[$r->vehicle_id];
                } elseif ($r->invoice_id && isset($invoiceBranchMap[$r->invoice_id])) {
                    $branchId = $invoiceBranchMap[$r->invoice_id];
                } elseif ($r->user_id && isset($userBranchMap[$r->user_id])) {
                    $branchId = $userBranchMap[$r->user_id];
                }

                if ($branchId !== null) {
                    DB::table('payments')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Backfill receipts (prefer invoice.branch_id -> payment.branch_id -> user.branch_id)
        DB::table('receipts')->orderBy('id')->chunkById(500, function ($rows) {
            $invoiceIds = [];
            $paymentIds = [];
            $userIds = [];

            foreach ($rows as $r) {
                if ($r->invoice_id) $invoiceIds[] = $r->invoice_id;
                if ($r->payment_id) $paymentIds[] = $r->payment_id;
                if ($r->user_id) $userIds[] = $r->user_id;
            }

            $invoiceBranchMap = [];
            if (count($invoiceIds) > 0) {
                $invoiceBranchMap = DB::table('invoices')->whereIn('id', array_unique($invoiceIds))->pluck('branch_id','id')->toArray();
            }

            $paymentBranchMap = [];
            if (count($paymentIds) > 0) {
                $paymentBranchMap = DB::table('payments')->whereIn('id', array_unique($paymentIds))->pluck('branch_id','id')->toArray();
            }

            $userBranchMap = [];
            if (count($userIds) > 0) {
                $userBranchMap = DB::table('users')->whereIn('id', array_unique($userIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->invoice_id && isset($invoiceBranchMap[$r->invoice_id])) {
                    $branchId = $invoiceBranchMap[$r->invoice_id];
                } elseif ($r->payment_id && isset($paymentBranchMap[$r->payment_id])) {
                    $branchId = $paymentBranchMap[$r->payment_id];
                } elseif ($r->user_id && isset($userBranchMap[$r->user_id])) {
                    $branchId = $userBranchMap[$r->user_id];
                }

                if ($branchId !== null) {
                    DB::table('receipts')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Backfill refunds (prefer payment.branch_id -> invoice.branch_id -> user.branch_id)
        DB::table('refunds')->orderBy('id')->chunkById(500, function ($rows) {
            $paymentIds = [];
            $invoiceIds = [];
            $userIds = [];

            foreach ($rows as $r) {
                if ($r->payment_id) $paymentIds[] = $r->payment_id;
                if ($r->invoice_id) $invoiceIds[] = $r->invoice_id;
                if ($r->user_id) $userIds[] = $r->user_id;
            }

            $paymentBranchMap = [];
            if (count($paymentIds) > 0) {
                $paymentBranchMap = DB::table('payments')->whereIn('id', array_unique($paymentIds))->pluck('branch_id','id')->toArray();
            }

            $invoiceBranchMap = [];
            if (count($invoiceIds) > 0) {
                $invoiceBranchMap = DB::table('invoices')->whereIn('id', array_unique($invoiceIds))->pluck('branch_id','id')->toArray();
            }

            $userBranchMap = [];
            if (count($userIds) > 0) {
                $userBranchMap = DB::table('users')->whereIn('id', array_unique($userIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->payment_id && isset($paymentBranchMap[$r->payment_id])) {
                    $branchId = $paymentBranchMap[$r->payment_id];
                } elseif ($r->invoice_id && isset($invoiceBranchMap[$r->invoice_id])) {
                    $branchId = $invoiceBranchMap[$r->invoice_id];
                } elseif ($r->user_id && isset($userBranchMap[$r->user_id])) {
                    $branchId = $userBranchMap[$r->user_id];
                }

                if ($branchId !== null) {
                    DB::table('refunds')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Backfill finance_applications (vehicle.branch_id -> user.branch_id)
        DB::table('finance_applications')->orderBy('id')->chunkById(500, function ($rows) {
            $vehicleIds = [];
            $userIds = [];
            foreach ($rows as $r) {
                if ($r->vehicle_id) $vehicleIds[] = $r->vehicle_id;
                if ($r->user_id) $userIds[] = $r->user_id;
            }

            $vehicleBranchMap = [];
            if (count($vehicleIds) > 0) {
                $vehicleBranchMap = DB::table('vehicles')->whereIn('id', array_unique($vehicleIds))->pluck('branch_id','id')->toArray();
            }

            $userBranchMap = [];
            if (count($userIds) > 0) {
                $userBranchMap = DB::table('users')->whereIn('id', array_unique($userIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->vehicle_id && isset($vehicleBranchMap[$r->vehicle_id])) {
                    $branchId = $vehicleBranchMap[$r->vehicle_id];
                } elseif ($r->user_id && isset($userBranchMap[$r->user_id])) {
                    $branchId = $userBranchMap[$r->user_id];
                }

                if ($branchId !== null) {
                    DB::table('finance_applications')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Backfill vehicle_reservations (vehicle.branch_id -> user.branch_id)
        DB::table('vehicle_reservations')->orderBy('id')->chunkById(500, function ($rows) {
            $vehicleIds = [];
            $userIds = [];
            foreach ($rows as $r) {
                if ($r->vehicle_id) $vehicleIds[] = $r->vehicle_id;
                if ($r->user_id) $userIds[] = $r->user_id;
            }

            $vehicleBranchMap = [];
            if (count($vehicleIds) > 0) {
                $vehicleBranchMap = DB::table('vehicles')->whereIn('id', array_unique($vehicleIds))->pluck('branch_id','id')->toArray();
            }

            $userBranchMap = [];
            if (count($userIds) > 0) {
                $userBranchMap = DB::table('users')->whereIn('id', array_unique($userIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->vehicle_id && isset($vehicleBranchMap[$r->vehicle_id])) {
                    $branchId = $vehicleBranchMap[$r->vehicle_id];
                } elseif ($r->user_id && isset($userBranchMap[$r->user_id])) {
                    $branchId = $userBranchMap[$r->user_id];
                }

                if ($branchId !== null) {
                    DB::table('vehicle_reservations')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Backfill import_payments by vehicle_import -> branch or payment -> branch
        DB::table('import_payments')->orderBy('id')->chunkById(500, function ($rows) {
            $vehicleImportIds = [];
            $paymentIds = [];
            foreach ($rows as $r) {
                if ($r->vehicle_import_id) $vehicleImportIds[] = $r->vehicle_import_id;
                if ($r->payment_id) $paymentIds[] = $r->payment_id;
            }

            $vehicleImportBranchMap = [];
            if (count($vehicleImportIds) > 0) {
                $vehicleImportBranchMap = DB::table('vehicle_imports')->whereIn('id', array_unique($vehicleImportIds))->pluck('branch_id','id')->toArray();
            }

            $paymentBranchMap = [];
            if (count($paymentIds) > 0) {
                $paymentBranchMap = DB::table('payments')->whereIn('id', array_unique($paymentIds))->pluck('branch_id','id')->toArray();
            }

            foreach ($rows as $r) {
                $branchId = null;
                if ($r->vehicle_import_id && isset($vehicleImportBranchMap[$r->vehicle_import_id])) {
                    $branchId = $vehicleImportBranchMap[$r->vehicle_import_id];
                } elseif ($r->payment_id && isset($paymentBranchMap[$r->payment_id])) {
                    $branchId = $paymentBranchMap[$r->payment_id];
                }

                if ($branchId !== null) {
                    DB::table('import_payments')->where('id', $r->id)->update(['branch_id' => $branchId]);
                }
            }
        });

        // Optionally: make columns non-nullable if you decide every row has branch assigned.
        // This migration leaves columns nullable to preserve compatibility; a follow-up migration can enforce non-null with safeguards.
    }

    public function down(): void
    {
        Schema::table('import_payments', function (Blueprint $table) {
            if (Schema::hasColumn('import_payments', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('vehicle_reservations', function (Blueprint $table) {
            if (Schema::hasColumn('vehicle_reservations', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('finance_applications', function (Blueprint $table) {
            if (Schema::hasColumn('finance_applications', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('refunds', function (Blueprint $table) {
            if (Schema::hasColumn('refunds', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('receipts', function (Blueprint $table) {
            if (Schema::hasColumn('receipts', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });

        Schema::table('vehicle_imports', function (Blueprint $table) {
            if (Schema::hasColumn('vehicle_imports', 'branch_id')) {
                $table->dropConstrainedForeignId('branch_id');
            }
        });
    }
};
