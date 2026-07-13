<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Buying Guide',
                'slug' => 'buying-guide',
                'description' => 'Complete guides to help you make informed vehicle purchasing decisions.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Maintenance Tips',
                'slug' => 'maintenance-tips',
                'description' => 'Expert advice on vehicle maintenance and care.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Industry News',
                'slug' => 'industry-news',
                'description' => 'Latest news and updates from the automotive industry.',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Vehicle Reviews',
                'slug' => 'vehicle-reviews',
                'description' => 'In-depth reviews of the latest vehicles on the market.',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Finance',
                'slug' => 'finance',
                'description' => 'Finance options, loans, and insurance information.',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Latest automotive technology and innovations.',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Electric Vehicles',
                'slug' => 'electric-vehicles',
                'description' => 'Everything about electric and hybrid vehicles.',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Safety',
                'slug' => 'safety',
                'description' => 'Vehicle safety features and ratings.',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
