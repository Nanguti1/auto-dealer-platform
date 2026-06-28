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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable();
            $table->uuid('role_id')->nullable();
            $table->uuid('branch_id')->nullable();
            $table->string('profile_image', 500)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->string('country', 100)->nullable();
            $table->json('preferences')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip', 45)->nullable();
            
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
            $table->index('role_id');
            $table->index('branch_id');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropIndex(['role_id']);
            $table->dropIndex(['branch_id']);
            $table->dropIndex(['email']);
            
            $table->dropColumn([
                'phone',
                'role_id',
                'branch_id',
                'profile_image',
                'date_of_birth',
                'address',
                'city',
                'state',
                'postal_code',
                'country',
                'preferences',
                'last_login_at',
                'last_login_ip'
            ]);
        });
    }
};
