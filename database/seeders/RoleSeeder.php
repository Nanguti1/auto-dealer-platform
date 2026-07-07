<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access with role management',
                'is_system' => true,
            ],
            [
                'name' => 'manager',
                'display_name' => 'Manager',
                'description' => 'Full operational access without role management',
                'is_system' => true,
            ],
            [
                'name' => 'staff',
                'display_name' => 'Staff',
                'description' => 'Limited operational access',
                'is_system' => true,
            ],
            [
                'name' => 'customer',
                'display_name' => 'Customer',
                'description' => 'Customer portal access only',
                'is_system' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}
