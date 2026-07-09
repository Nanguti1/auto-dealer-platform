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
        Schema::table('receipts', function (Blueprint $table) {
            $table->index(['user_id', 'created_at'], 'receipts_user_created_index');
        });

        Schema::table('refunds', function (Blueprint $table) {
            $table->index(['user_id', 'created_at'], 'refunds_user_created_index');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->index(['user_id', 'created_at'], 'invoices_user_created_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('receipts', function (Blueprint $table) {
            $table->dropIndex('receipts_user_created_index');
        });

        Schema::table('refunds', function (Blueprint $table) {
            $table->dropIndex('refunds_user_created_index');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropIndex('invoices_user_created_index');
        });
    }
};
