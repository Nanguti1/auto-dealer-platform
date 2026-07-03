<?php

namespace Database\Seeders;

use App\Models\InventoryStatus;
use Illuminate\Database\Seeder;

class InventoryStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Available',
                'slug' => 'available',
                'code' => 'AVL',
                'description' => 'Vehicle is available for sale',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Reserved',
                'slug' => 'reserved',
                'code' => 'RSV',
                'description' => 'Vehicle is reserved by a customer',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Sold',
                'slug' => 'sold',
                'code' => 'SOLD',
                'description' => 'Vehicle has been sold',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Delivered',
                'slug' => 'delivered',
                'code' => 'DLV',
                'description' => 'Vehicle has been delivered to customer',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Cancelled',
                'slug' => 'cancelled',
                'code' => 'CANC',
                'description' => 'Reservation or sale has been cancelled',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Returned',
                'slug' => 'returned',
                'code' => 'RET',
                'description' => 'Vehicle has been returned',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Archived',
                'slug' => 'archived',
                'code' => 'ARCH',
                'description' => 'Vehicle is archived',
                'is_active' => false,
                'sort_order' => 7,
            ],
        ];

        foreach ($statuses as $status) {
            InventoryStatus::firstOrCreate(
                ['slug' => $status['slug']],
                $status
            );
        }
    }
}
