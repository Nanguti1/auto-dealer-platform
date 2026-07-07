<?php

namespace Database\Seeders;

use App\Models\VehicleCategory;
use Illuminate\Database\Seeder;

class VehicleCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Passenger Car',
                'slug' => 'passenger-car',
                'code' => 'PC',
                'description' => 'Passenger cars',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'SUV',
                'slug' => 'suv',
                'code' => 'SUV',
                'description' => 'Sport Utility Vehicles',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Truck',
                'slug' => 'truck',
                'code' => 'TRK',
                'description' => 'Pickup trucks',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Van',
                'slug' => 'van',
                'code' => 'VAN',
                'description' => 'Vans and minivans',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Performance',
                'slug' => 'performance',
                'code' => 'PERF',
                'description' => 'Performance and sports cars',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Luxury',
                'slug' => 'luxury',
                'code' => 'LUX',
                'description' => 'Luxury vehicles',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Hybrid/Electric',
                'slug' => 'hybrid-electric',
                'code' => 'HEV',
                'description' => 'Hybrid and electric vehicles',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Commercial',
                'slug' => 'commercial',
                'code' => 'COM',
                'description' => 'Commercial vehicles',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($categories as $category) {
            VehicleCategory::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
