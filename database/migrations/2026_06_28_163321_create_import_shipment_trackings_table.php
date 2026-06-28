<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('import_shipment_trackings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_import_id')->constrained('vehicle_imports')->cascadeOnDelete();
            $table->string('tracking_number')->nullable()->index();
            $table->string('carrier')->nullable();
            $table->string('status')->index();
            $table->string('location')->nullable();
            $table->timestamp('occurred_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('import_shipment_trackings');
    }
};
