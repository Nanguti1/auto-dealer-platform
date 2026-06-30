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
        Schema::create('trade_in_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trade_in_request_id')->constrained('trade_in_requests')->cascadeOnDelete();
            $table->foreignId('valuation_id')->nullable()->constrained('trade_in_valuations')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('offer_amount', 12, 2);
            $table->date('valid_until')->nullable();
            $table->string('status')->default('pending')->index();
            $table->text('notes')->nullable();
            $table->json('terms')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_in_offers');
    }
};
