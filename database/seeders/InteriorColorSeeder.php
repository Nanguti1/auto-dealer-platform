<?php

namespace Database\Seeders;

use App\Models\InteriorColor;
use Illuminate\Database\Seeder;

class InteriorColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'name' => 'Black',
                'slug' => 'black',
                'code' => 'BLK',
                'description' => 'Black interior',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Gray',
                'slug' => 'gray',
                'code' => 'GRY',
                'description' => 'Gray interior',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Beige',
                'slug' => 'beige',
                'code' => 'BGE',
                'description' => 'Beige interior',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Tan',
                'slug' => 'tan',
                'code' => 'TAN',
                'description' => 'Tan interior',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Brown',
                'slug' => 'brown',
                'code' => 'BRN',
                'description' => 'Brown interior',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'White',
                'slug' => 'white',
                'code' => 'WHT',
                'description' => 'White interior',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Red',
                'slug' => 'red',
                'code' => 'RED',
                'description' => 'Red interior',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Blue',
                'slug' => 'blue',
                'code' => 'BLU',
                'description' => 'Blue interior',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($colors as $color) {
            InteriorColor::firstOrCreate(
                ['slug' => $color['slug']],
                $color
            );
        }
    }
}
