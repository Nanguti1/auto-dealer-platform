<?php

namespace Database\Seeders;

use App\Models\BodyType;
use Illuminate\Database\Seeder;

class BodyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bodyTypes = [
            [
                'name' => 'Sedan',
                'slug' => 'sedan',
                'code' => 'SED',
                'description' => 'Traditional 4-door sedan',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'SUV',
                'slug' => 'suv',
                'code' => 'SUV',
                'description' => 'Sport Utility Vehicle',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Truck',
                'slug' => 'truck',
                'code' => 'TRK',
                'description' => 'Pickup truck',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Coupe',
                'slug' => 'coupe',
                'code' => 'CPE',
                'description' => '2-door coupe',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Hatchback',
                'slug' => 'hatchback',
                'code' => 'HAT',
                'description' => 'Hatchback style vehicle',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Convertible',
                'slug' => 'convertible',
                'code' => 'CON',
                'description' => 'Convertible with retractable roof',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Van',
                'slug' => 'van',
                'code' => 'VAN',
                'description' => 'Passenger or cargo van',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Wagon',
                'slug' => 'wagon',
                'code' => 'WAG',
                'description' => 'Station wagon',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Crossover',
                'slug' => 'crossover',
                'code' => 'XOV',
                'description' => 'Crossover SUV',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Minivan',
                'slug' => 'minivan',
                'code' => 'MIN',
                'description' => 'Minivan for family use',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($bodyTypes as $bodyType) {
            BodyType::firstOrCreate(
                ['slug' => $bodyType['slug']],
                $bodyType
            );
        }
    }
}
