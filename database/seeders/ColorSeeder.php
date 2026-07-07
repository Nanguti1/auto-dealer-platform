<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
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
                'description' => 'Black exterior color',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'White',
                'slug' => 'white',
                'code' => 'WHT',
                'description' => 'White exterior color',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Silver',
                'slug' => 'silver',
                'code' => 'SLV',
                'description' => 'Silver exterior color',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Gray',
                'slug' => 'gray',
                'code' => 'GRY',
                'description' => 'Gray exterior color',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Red',
                'slug' => 'red',
                'code' => 'RED',
                'description' => 'Red exterior color',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Blue',
                'slug' => 'blue',
                'code' => 'BLU',
                'description' => 'Blue exterior color',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Green',
                'slug' => 'green',
                'code' => 'GRN',
                'description' => 'Green exterior color',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Brown',
                'slug' => 'brown',
                'code' => 'BRN',
                'description' => 'Brown exterior color',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Beige',
                'slug' => 'beige',
                'code' => 'BGE',
                'description' => 'Beige exterior color',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Gold',
                'slug' => 'gold',
                'code' => 'GLD',
                'description' => 'Gold exterior color',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($colors as $color) {
            Color::firstOrCreate(
                ['slug' => $color['slug']],
                $color
            );
        }
    }
}
