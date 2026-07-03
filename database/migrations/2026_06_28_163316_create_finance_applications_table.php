<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('finance_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('lender_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('requested_amount', 12, 2);
            $table->decimal('down_payment', 12, 2)->default(0);
            $table->unsignedSmallInteger('term_months');
            $table->decimal('interest_rate', 5, 2)->nullable();
            $table->decimal('estimated_monthly_payment', 12, 2)->nullable();
            $table->string('status')->default('submitted')->index();
            $table->json('applicant_data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('finance_applications');
    }
};
