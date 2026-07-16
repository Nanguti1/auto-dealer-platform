<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->nullable()->constrained()->nullOnDelete();
            $table->string('company_name');
            $table->string('supplier_code')->unique();
            $table->string('contact_person')->nullable();
            $table->enum('supplier_type', ['vehicle_dealer', 'vehicle_manufacturer', 'spare_parts_supplier', 'accessories_supplier', 'auction_house', 'individual', 'other'])->default('other');
            $table->string('email')->nullable()->index();
            $table->string('phone')->nullable();
            $table->string('alternative_phone')->nullable();
            $table->string('website')->nullable();
            $table->string('country')->nullable();
            $table->string('county')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->text('physical_address')->nullable();
            $table->string('tax_pin')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('payment_terms')->nullable();
            $table->string('currency')->default('USD');
            $table->decimal('credit_limit', 15, 2)->default(0);
            $table->enum('status', ['active', 'inactive', 'blacklisted'])->default('active');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['company_name', 'supplier_code']);
            $table->index('status');
            $table->index('supplier_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
