<?php

namespace Database\Seeders;

use App\Models\DriveType;
use Illuminate\Database\Seeder;

class DriveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $driveTypes = [
            [
                'name' => 'Front-Wheel Drive',
                'slug' => 'fwd',
                'code' => 'FWD',
                'description' => 'Front-wheel drive',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Rear-Wheel Drive',
                'slug' => 'rwd',
                'code' => 'RWD',
                'description' => 'Rear-wheel drive',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'All-Wheel Drive',
                'slug' => 'awd',
                'code' => 'AWD',
                'description' => 'All-wheel drive',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Four-Wheel Drive',
                'slug' => '4wd',
                'code' => '4WD',
                'description' => 'Four-wheel drive',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($driveTypes as $driveType) {
            DriveType::firstOrCreate(
                ['slug' => $driveType['slug']],
                $driveType
            );
        }
    }
}
