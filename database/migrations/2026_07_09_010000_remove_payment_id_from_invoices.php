<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // If invoices.payment_id exists, migrate its relationship onto payments.invoice_id and then drop the column.
        if (Schema::hasColumn('invoices', 'payment_id')) {
            // Ensure payments.invoice_id exists (it should per earlier migration). If not, create it.
            if (! Schema::hasColumn('payments', 'invoice_id')) {
                Schema::table('payments', function (Blueprint $table) {
                    $table->foreignId('invoice_id')->nullable()->after('vehicle_reservation_id')->constrained()->nullOnDelete();
                });
            }

            // Backfill payments.invoice_id for payments referenced by invoices.payment_id
            // Do this in chunks to avoid locking large tables.
            DB::table('invoices')->orderBy('id')->select(['id', 'payment_id'])->chunkById(500, function ($invoices) {
                $paymentUpdates = [];
                foreach ($invoices as $inv) {
                    if ($inv->payment_id) {
                        $paymentUpdates[$inv->payment_id] = (int) $inv->id;
                    }
                }

                if (! empty($paymentUpdates)) {
                    foreach ($paymentUpdates as $paymentId => $invoiceId) {
                        DB::table('payments')->where('id', $paymentId)->update(['invoice_id' => $invoiceId]);
                    }
                }
            });

            // Drop any indexes on invoices.payment_id if present
            Schema::table('invoices', function (Blueprint $table) {
                // Defensive: drop index by name if exists
                try {
                    $table->dropIndex(['payment_id', 'status']);
                } catch (\Throwable $e) {
                    // ignore if index does not exist
                }

                try {
                    $table->dropIndex(['payment_id']);
                } catch (\Throwable $e) {
                    // ignore
                }

                // Drop foreign and column
                try {
                    $table->dropForeign(['payment_id']);
                } catch (\Throwable $e) {
                    // ignore
                }

                try {
                    $table->dropColumn('payment_id');
                } catch (\Throwable $e) {
                    // ignore
                }
            });
        }
    }

    public function down(): void
    {
        // Recreate payment_id on invoices and backfill from payments.invoice_id where possible.
        if (! Schema::hasColumn('invoices', 'payment_id')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->foreignId('payment_id')->nullable()->after('vehicle_id')->constrained()->nullOnDelete();
            });

            // Backfill invoices.payment_id from payments.invoice_id where possible (if a payment points to an invoice)
            DB::table('payments')->orderBy('id')->select(['id','invoice_id'])->chunkById(500, function ($payments) {
                foreach ($payments as $p) {
                    if ($p->invoice_id) {
                        // Only set if invoice.payment_id is null to avoid overwriting
                        DB::table('invoices')->where('id', $p->invoice_id)->whereNull('payment_id')->update(['payment_id' => $p->id]);
                    }
                }
            });
        }
    }
};
