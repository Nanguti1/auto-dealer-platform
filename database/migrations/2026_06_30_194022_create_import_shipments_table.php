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
        Schema::create('import_shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_import_id')->constrained('vehicle_imports')->cascadeOnDelete();
            $table->string('tracking_number')->nullable()->index();
            $table->string('carrier')->nullable();
            $table->string('status')->default('pending')->index();
            $table->string('current_location')->nullable();
            $table->timestamp('estimated_arrival')->nullable();
            $table->timestamp('actual_arrival')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_shipments');
    }
};
