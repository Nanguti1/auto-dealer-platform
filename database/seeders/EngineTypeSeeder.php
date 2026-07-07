<?php

namespace Database\Seeders;

use App\Models\EngineType;
use Illuminate\Database\Seeder;

class EngineTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $engineTypes = [
            [
                'name' => 'Inline-4',
                'slug' => 'inline-4',
                'code' => 'I4',
                'description' => 'Inline 4-cylinder engine',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'V6',
                'slug' => 'v6',
                'code' => 'V6',
                'description' => 'V6 engine',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'V8',
                'slug' => 'v8',
                'code' => 'V8',
                'description' => 'V8 engine',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Inline-6',
                'slug' => 'inline-6',
                'code' => 'I6',
                'description' => 'Inline 6-cylinder engine',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'V10',
                'slug' => 'v10',
                'code' => 'V10',
                'description' => 'V10 engine',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'V12',
                'slug' => 'v12',
                'code' => 'V12',
                'description' => 'V12 engine',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Electric Motor',
                'slug' => 'electric-motor',
                'code' => 'EM',
                'description' => 'Electric motor',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Rotary',
                'slug' => 'rotary',
                'code' => 'ROT',
                'description' => 'Rotary engine',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($engineTypes as $engineType) {
            EngineType::firstOrCreate(
                ['slug' => $engineType['slug']],
                $engineType
            );
        }
    }
}
