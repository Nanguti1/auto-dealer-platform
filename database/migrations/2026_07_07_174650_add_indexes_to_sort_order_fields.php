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
        Schema::table('hero_sliders', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });

        Schema::table('home_page_sections', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });

        Schema::table('social_media_links', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });

        Schema::table('blog_categories', function (Blueprint $table) {
            $table->index('sort_order');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_sliders', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });

        Schema::table('home_page_sections', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });

        Schema::table('social_media_links', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });

        Schema::table('blog_categories', function (Blueprint $table) {
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_active']);
        });
    }
};
