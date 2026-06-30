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
        Schema::create('import_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_import_id')->constrained('vehicle_imports')->cascadeOnDelete();
            $table->foreignId('payment_id')->nullable()->constrained('payments')->nullOnDelete();
            $table->string('payment_reference')->nullable()->index();
            $table->decimal('amount', 12, 2);
            $table->string('currency')->default('USD');
            $table->string('payment_type')->default('deposit');
            $table->string('status')->default('pending')->index();
            $table->date('due_date')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_payments');
    }
};
