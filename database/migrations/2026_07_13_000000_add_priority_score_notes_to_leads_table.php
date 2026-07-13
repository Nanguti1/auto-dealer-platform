<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->string('priority')->nullable()->after('last_contacted_at');
            $table->integer('score')->nullable()->after('priority');
            $table->text('notes')->nullable()->after('score');
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn(['priority', 'score', 'notes']);
        });
    }
};
