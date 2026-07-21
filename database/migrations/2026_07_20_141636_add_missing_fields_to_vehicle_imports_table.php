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
        Schema::table('vehicle_imports', function (Blueprint $table) {
            $table->unsignedBigInteger('assigned_user_id')->nullable()->after('user_id');
            $table->string('current_stage')->nullable()->after('status');
            $table->string('payment_status')->nullable()->after('current_stage');
            $table->timestamp('estimated_arrival')->nullable()->after('destination_port');
            $table->unsignedBigInteger('lead_id')->nullable()->after('notes');
            $table->unsignedBigInteger('finance_application_id')->nullable()->after('lead_id');
            $table->unsignedBigInteger('trade_in_id')->nullable()->after('finance_application_id');

            $table->foreign('assigned_user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('lead_id')->references('id')->on('leads')->onDelete('set null');
            $table->foreign('finance_application_id')->references('id')->on('finance_applications')->onDelete('set null');
            $table->foreign('trade_in_id')->references('id')->on('trade_in_requests')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_imports', function (Blueprint $table) {
            $table->dropForeign(['assigned_user_id']);
            $table->dropForeign(['lead_id']);
            $table->dropForeign(['finance_application_id']);
            $table->dropForeign(['trade_in_id']);
            $table->dropColumn(['assigned_user_id', 'current_stage', 'payment_status', 'estimated_arrival', 'lead_id', 'finance_application_id', 'trade_in_id']);
        });
    }
};
