<?php

namespace Database\Seeders;

use App\Models\VehicleStatus;
use Illuminate\Database\Seeder;

class VehicleStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Draft',
                'slug' => 'draft',
                'code' => 'DFT',
                'description' => 'Vehicle is in draft status, not yet published',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Pending Approval',
                'slug' => 'pending-approval',
                'code' => 'PND',
                'description' => 'Vehicle is pending approval',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Published',
                'slug' => 'published',
                'code' => 'PUB',
                'description' => 'Vehicle is published and visible on the website',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Reserved',
                'slug' => 'reserved',
                'code' => 'RSV',
                'description' => 'Vehicle is reserved by a customer',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Sold',
                'slug' => 'sold',
                'code' => 'SOLD',
                'description' => 'Vehicle has been sold',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Archived',
                'slug' => 'archived',
                'code' => 'ARCH',
                'description' => 'Vehicle is archived and no longer visible',
                'is_active' => false,
                'sort_order' => 6,
            ],
        ];

        foreach ($statuses as $status) {
            VehicleStatus::firstOrCreate(
                ['slug' => $status['slug']],
                $status
            );
        }
    }
}
