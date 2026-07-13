<?php

namespace Database\Seeders;

use App\Models\BlogTag;
use Illuminate\Database\Seeder;

class BlogTagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Buying Guide',
                'slug' => 'buying-guide',
                'color' => '#3B82F6',
                'usage_count' => 0,
            ],
            [
                'name' => 'Maintenance Tips',
                'slug' => 'maintenance-tips',
                'color' => '#10B981',
                'usage_count' => 0,
            ],
            [
                'name' => 'Industry News',
                'slug' => 'industry-news',
                'color' => '#F59E0B',
                'usage_count' => 0,
            ],
            [
                'name' => 'Vehicle Reviews',
                'slug' => 'vehicle-reviews',
                'color' => '#8B5CF6',
                'usage_count' => 0,
            ],
            [
                'name' => 'Finance',
                'slug' => 'finance',
                'color' => '#EF4444',
                'usage_count' => 0,
            ],
            [
                'name' => 'Insurance',
                'slug' => 'insurance',
                'color' => '#EC4899',
                'usage_count' => 0,
            ],
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'color' => '#6366F1',
                'usage_count' => 0,
            ],
            [
                'name' => 'Safety',
                'slug' => 'safety',
                'color' => '#10B981',
                'usage_count' => 0,
            ],
            [
                'name' => 'Electric Vehicles',
                'slug' => 'electric-vehicles',
                'color' => '#3B82F6',
                'usage_count' => 0,
            ],
            [
                'name' => 'Hybrid Cars',
                'slug' => 'hybrid-cars',
                'color' => '#10B981',
                'usage_count' => 0,
            ],
            [
                'name' => 'Luxury',
                'slug' => 'luxury',
                'color' => '#8B5CF6',
                'usage_count' => 0,
            ],
            [
                'name' => 'Family Cars',
                'slug' => 'family-cars',
                'color' => '#F59E0B',
                'usage_count' => 0,
            ],
            [
                'name' => 'Performance',
                'slug' => 'performance',
                'color' => '#EF4444',
                'usage_count' => 0,
            ],
            [
                'name' => 'Off-Road',
                'slug' => 'off-road',
                'color' => '#6366F1',
                'usage_count' => 0,
            ],
        ];

        foreach ($tags as $tag) {
            BlogTag::firstOrCreate(
                ['slug' => $tag['slug']],
                $tag
            );
        }
    }
}
