<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Makes company_id nullable in branches table.
     *
     * This change aligns with the single-tenant architecture where company_id
     * is used for informational/hierarchical purposes only, not for tenant isolation.
     * Making it nullable allows branches to exist without a company association
     * for simpler single-tenant deployments where company data may not be needed.
     */
    public function up(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropUnique(['company_id', 'slug']);
            $table->foreignId('company_id')->nullable()->change();
            $table->foreign('company_id')->constrained()->nullOnDelete();
            $table->unique(['slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropUnique(['slug']);
            $table->foreignId('company_id')->nullable(false)->change();
            $table->foreign('company_id')->constrained()->cascadeOnDelete();
            $table->unique(['company_id', 'slug']);
        });
    }
};
