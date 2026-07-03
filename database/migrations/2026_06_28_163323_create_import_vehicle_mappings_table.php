<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('import_vehicle_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_import_id')->constrained('vehicle_imports')->cascadeOnDelete();
            $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $table->unique(['vehicle_import_id', 'vehicle_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('import_vehicle_mappings');
    }
};
