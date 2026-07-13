<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dynamic_cms_pages', function (Blueprint $table) {
            $table->boolean('is_visible')->default(true)->after('status');
            $table->string('meta_title')->nullable()->after('published_at');
            $table->text('meta_description')->nullable()->after('meta_title');
        });
    }

    public function down(): void
    {
        Schema::table('dynamic_cms_pages', function (Blueprint $table) {
            $table->dropColumn(['is_visible', 'meta_title', 'meta_description']);
        });
    }
};
