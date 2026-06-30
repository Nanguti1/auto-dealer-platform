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
        Schema::create('trade_in_valuations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trade_in_request_id')->constrained('trade_in_requests')->cascadeOnDelete();
            $table->foreignId('valuation_source_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('trade_in_value', 12, 2);
            $table->decimal('wholesale_value', 12, 2)->nullable();
            $table->decimal('retail_value', 12, 2)->nullable();
            $table->string('valuation_method')->default('manual');
            $table->json('market_comparables')->nullable();
            $table->text('adjustments')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_in_valuations');
    }
};
