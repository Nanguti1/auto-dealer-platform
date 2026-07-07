<?php

namespace Database\Seeders;

use App\Models\FuelType;
use Illuminate\Database\Seeder;

class FuelTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fuelTypes = [
            [
                'name' => 'Gasoline',
                'slug' => 'gasoline',
                'code' => 'GAS',
                'description' => 'Traditional gasoline fuel',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Diesel',
                'slug' => 'diesel',
                'code' => 'DSL',
                'description' => 'Diesel fuel',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Electric',
                'slug' => 'electric',
                'code' => 'ELEC',
                'description' => 'Electric vehicle',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Hybrid',
                'slug' => 'hybrid',
                'code' => 'HYB',
                'description' => 'Hybrid gasoline-electric',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Plug-in Hybrid',
                'slug' => 'plug-in-hybrid',
                'code' => 'PHEV',
                'description' => 'Plug-in hybrid electric vehicle',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Natural Gas',
                'slug' => 'natural-gas',
                'code' => 'CNG',
                'description' => 'Compressed natural gas',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Hydrogen',
                'slug' => 'hydrogen',
                'code' => 'H2',
                'description' => 'Hydrogen fuel cell',
                'is_active' => true,
                'sort_order' => 7,
            ],
        ];

        foreach ($fuelTypes as $fuelType) {
            FuelType::firstOrCreate(
                ['slug' => $fuelType['slug']],
                $fuelType
            );
        }
    }
}
