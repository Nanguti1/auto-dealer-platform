<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('finance_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('finance_application_id')->constrained('finance_applications')->cascadeOnDelete();
            $table->string('name');
            $table->string('path');
            $table->string('type')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('finance_documents');
    }
};
