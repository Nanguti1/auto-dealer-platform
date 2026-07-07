<?php

namespace Database\Seeders;

use App\Models\VehicleCondition;
use Illuminate\Database\Seeder;

class VehicleConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conditions = [
            [
                'name' => 'New',
                'slug' => 'new',
                'code' => 'NEW',
                'description' => 'Brand new vehicle, never used',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Like New',
                'slug' => 'like-new',
                'code' => 'LIKE',
                'description' => 'Vehicle in excellent condition, like new',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Excellent',
                'slug' => 'excellent',
                'code' => 'EXC',
                'description' => 'Vehicle in excellent condition with minimal wear',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Good',
                'slug' => 'good',
                'code' => 'GOOD',
                'description' => 'Vehicle in good condition with normal wear',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Fair',
                'slug' => 'fair',
                'code' => 'FAIR',
                'description' => 'Vehicle in fair condition with noticeable wear',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Poor',
                'slug' => 'poor',
                'code' => 'POOR',
                'description' => 'Vehicle in poor condition, needs significant repairs',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($conditions as $condition) {
            VehicleCondition::firstOrCreate(
                ['slug' => $condition['slug']],
                $condition
            );
        }
    }
}
