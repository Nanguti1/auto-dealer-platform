<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'name' => 'Nairobi',
                'slug' => 'nairobi',
                'address' => 'Nairobi, Kenya',
                'phone' => '+254 700 000 001',
                'email' => 'nairobi@dealership.co.ke',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Mombasa',
                'slug' => 'mombasa',
                'address' => 'Mombasa, Kenya',
                'phone' => '+254 700 000 002',
                'email' => 'mombasa@dealership.co.ke',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Kisumu',
                'slug' => 'kisumu',
                'address' => 'Kisumu, Kenya',
                'phone' => '+254 700 000 003',
                'email' => 'kisumu@dealership.co.ke',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Nakuru',
                'slug' => 'nakuru',
                'address' => 'Nakuru, Kenya',
                'phone' => '+254 700 000 004',
                'email' => 'nakuru@dealership.co.ke',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::firstOrCreate(
                ['slug' => $branch['slug']],
                $branch
            );
        }
    }
}
