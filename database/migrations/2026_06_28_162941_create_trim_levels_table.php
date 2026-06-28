<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trim_levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('model_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->boolean('is_active')->default(true)->index();
            $table->unique(['model_id','slug']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trim_levels');
    }
};
