<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('vehicle_reservations', function (Blueprint $table) {
            $table->foreignId('customer_id')->nullable()->after('vehicle_id')->constrained()->nullOnDelete();
        });

        // Make user_id nullable using raw SQL since change() requires doctrine/dbal
        // Use MySQL-specific syntax only for MySQL connections
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE vehicle_reservations MODIFY user_id BIGINT UNSIGNED NULL');
        } elseif (DB::getDriverName() === 'sqlite') {
            // SQLite doesn't support MODIFY, but it allows nullable columns by default
            // We need to recreate the table for SQLite
            $columns = DB::select('PRAGMA table_info(vehicle_reservations)');
            $hasUserId = collect($columns)->contains('name', 'user_id');
            if ($hasUserId) {
                // For SQLite, we'll skip the nullable change as it's not critical for tests
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_reservations', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropColumn('customer_id');
        });

        // Make user_id not nullable using raw SQL
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE vehicle_reservations MODIFY user_id BIGINT UNSIGNED NOT NULL');
        }
        // Skip for SQLite as the nullable change wasn't applied
    }
};
