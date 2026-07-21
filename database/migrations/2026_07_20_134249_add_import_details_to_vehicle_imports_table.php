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
        Schema::table('vehicle_imports', function (Blueprint $table) {
            $table->string('port_of_loading')->nullable()->after('destination_port');
            $table->string('shipping_method')->nullable()->after('port_of_loading');
            $table->decimal('insurance_value', 15, 2)->nullable()->default(0)->after('estimated_cost');
            $table->text('special_instructions')->nullable()->after('insurance_value');
            $table->text('notes')->nullable()->after('special_instructions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_imports', function (Blueprint $table) {
            $table->dropColumn(['port_of_loading', 'shipping_method', 'insurance_value', 'special_instructions', 'notes']);
        });
    }
};
