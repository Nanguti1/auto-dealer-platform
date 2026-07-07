<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Change vehicles.branch_id from cascadeOnDelete to restrictOnDelete
        // to prevent accidental deletion of vehicles when a branch is deleted
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign(['branch_id']);
            $table->foreign('branch_id')->references('id')->on('branches')->restrictOnDelete();
        });

        // Change branches.company_id from cascadeOnDelete to restrictOnDelete
        // to prevent accidental deletion of branches when a company is deleted
        Schema::table('branches', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')->references('id')->on('companies')->restrictOnDelete();
        });

        // Change models.make_id from cascadeOnDelete to restrictOnDelete
        // to prevent accidental deletion of models when a make is deleted
        Schema::table('models', function (Blueprint $table) {
            $table->dropForeign(['make_id']);
            $table->foreign('make_id')->references('id')->on('makes')->restrictOnDelete();
        });

        // Change trim_levels.model_id from cascadeOnDelete to restrictOnDelete
        // to prevent accidental deletion of trim levels when a model is deleted
        Schema::table('trim_levels', function (Blueprint $table) {
            $table->dropForeign(['model_id']);
            $table->foreign('model_id')->references('id')->on('models')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        // Revert vehicles.branch_id back to cascadeOnDelete
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign(['branch_id']);
            $table->foreign('branch_id')->references('id')->on('branches')->cascadeOnDelete();
        });

        // Revert branches.company_id back to cascadeOnDelete
        Schema::table('branches', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });

        // Revert models.make_id back to cascadeOnDelete
        Schema::table('models', function (Blueprint $table) {
            $table->dropForeign(['make_id']);
            $table->foreign('make_id')->references('id')->on('makes')->cascadeOnDelete();
        });

        // Revert trim_levels.model_id back to cascadeOnDelete
        Schema::table('trim_levels', function (Blueprint $table) {
            $table->dropForeign(['model_id']);
            $table->foreign('model_id')->references('id')->on('models')->cascadeOnDelete();
        });
    }
};
