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
                'description' => 'Full system access with role management, user management, and all operational permissions',
                'is_system' => true,
            ],
            [
                'name' => 'manager',
                'display_name' => 'Manager',
                'description' => 'Full operational access including inventory management, sales oversight, and reporting. Cannot manage roles or users.',
                'is_system' => true,
            ],
            [
                'name' => 'sales_manager',
                'display_name' => 'Sales Manager',
                'description' => 'Sales team management, lead assignment, and sales performance tracking. Limited to sales-related operations.',
                'is_system' => true,
            ],
            [
                'name' => 'finance_manager',
                'display_name' => 'Finance Manager',
                'description' => 'Finance application processing, lender management, and financial reporting. Limited to finance operations.',
                'is_system' => true,
            ],
            [
                'name' => 'inventory_manager',
                'display_name' => 'Inventory Manager',
                'description' => 'Vehicle inventory management, pricing, and stock control. Limited to inventory operations.',
                'is_system' => true,
            ],
            [
                'name' => 'sales_staff',
                'display_name' => 'Sales Staff',
                'description' => 'Basic sales operations, customer interactions, and lead management. Cannot approve pricing or discounts.',
                'is_system' => true,
            ],
            [
                'name' => 'finance_staff',
                'display_name' => 'Finance Staff',
                'description' => 'Basic finance operations, document processing, and application submission. Cannot approve loans.',
                'is_system' => true,
            ],
            [
                'name' => 'service_staff',
                'display_name' => 'Service Staff',
                'description' => 'Vehicle service operations, maintenance scheduling, and service history management.',
                'is_system' => true,
            ],
            [
                'name' => 'staff',
                'display_name' => 'General Staff',
                'description' => 'Limited operational access across multiple departments. Role-specific permissions apply.',
                'is_system' => true,
            ],
            [
                'name' => 'customer',
                'display_name' => 'Customer',
                'description' => 'Customer portal access for browsing inventory, scheduling test drives, and managing finance applications.',
                'is_system' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                $role
            );
        }

        $this->command->info('Roles seeded successfully.');
    }
}
