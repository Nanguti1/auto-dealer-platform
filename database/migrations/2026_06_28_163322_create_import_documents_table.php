<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('import_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_import_id')->constrained('vehicle_imports')->cascadeOnDelete();
            $table->string('name');
            $table->string('type')->index();
            $table->string('path');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('import_documents');
    }
};
