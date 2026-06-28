<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('make_id')->constrained()->restrictOnDelete();
            $table->foreignId('model_id')->constrained()->restrictOnDelete();
            $table->foreignId('trim_level_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('body_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('fuel_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('transmission_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('drive_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('engine_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('color_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('interior_color_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_condition_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_status_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('inventory_status_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('assigned_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('stock_number')->unique();
            $table->string('vin')->unique();
            $table->unsignedSmallInteger('year')->index();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedInteger('mileage')->default(0);
            $table->decimal('cost_price',12,2)->nullable();
            $table->decimal('sale_price',12,2)->index();
            $table->decimal('msrp',12,2)->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_certified')->default(false);
            $table->date('acquired_at')->nullable();
            $table->date('listed_at')->nullable();
            $table->date('sold_at')->nullable();
            $table->longText('description')->nullable();
            $table->json('metadata')->nullable();
            $table->softDeletes();
            $table->index(['branch_id','sale_price']);
            $table->index(['make_id','model_id','year']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
