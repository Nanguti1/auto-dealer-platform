<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // This migration is no longer needed as the columns already exist in the base migration
        // We'll make it a no-op to avoid migration conflicts
    }

    public function down(): void
    {
        // No-op as well
    }
};
