<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comparison_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_comparison_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $table->unique(['vehicle_comparison_id','vehicle_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comparison_items');
    }
};
