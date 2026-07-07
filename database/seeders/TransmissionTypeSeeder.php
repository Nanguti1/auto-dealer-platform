<?php

namespace Database\Seeders;

use App\Models\TransmissionType;
use Illuminate\Database\Seeder;

class TransmissionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transmissionTypes = [
            [
                'name' => 'Automatic',
                'slug' => 'automatic',
                'code' => 'AUTO',
                'description' => 'Automatic transmission',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Manual',
                'slug' => 'manual',
                'code' => 'MAN',
                'description' => 'Manual transmission',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'CVT',
                'slug' => 'cvt',
                'code' => 'CVT',
                'description' => 'Continuously Variable Transmission',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Dual-Clutch',
                'slug' => 'dual-clutch',
                'code' => 'DCT',
                'description' => 'Dual-clutch automatic transmission',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($transmissionTypes as $transmissionType) {
            TransmissionType::firstOrCreate(
                ['slug' => $transmissionType['slug']],
                $transmissionType
            );
        }
    }
}
