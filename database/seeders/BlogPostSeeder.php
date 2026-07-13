<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $categories = BlogCategory::all();
        $tags = BlogTag::all();
        $author = User::first() ?? User::factory()->create();

        if ($categories->isEmpty()) {
            $this->command->warn('No blog categories found. Run BlogCategorySeeder first.');
            return;
        }

        $posts = [
            [
                'title' => 'The Ultimate Guide to Buying Your First Car',
                'slug' => 'ultimate-guide-buying-first-car',
                'excerpt' => 'Everything you need to know before purchasing your first vehicle, from budgeting to negotiation.',
                'body' => 'Buying your first car is an exciting milestone. This comprehensive guide covers everything from setting your budget to choosing the right vehicle, negotiating the price, and understanding financing options. We\'ll walk you through the entire process step by step.',
                'category_slug' => 'buying-guide',
                'tags' => ['buying-guide', 'finance'],
                'status' => 'published',
            ],
            [
                'title' => 'Top 10 Maintenance Tips for Long-Lasting Vehicle Performance',
                'slug' => 'top-10-maintenance-tips-vehicle-performance',
                'excerpt' => 'Essential maintenance practices to keep your vehicle running smoothly for years to come.',
                'body' => 'Regular maintenance is key to extending your vehicle\'s lifespan and ensuring optimal performance. Learn the top 10 maintenance tips every car owner should know, from oil changes to tire rotations and everything in between.',
                'category_slug' => 'maintenance-tips',
                'tags' => ['maintenance-tips', 'safety'],
                'status' => 'published',
            ],
            [
                'title' => 'Electric Vehicles vs. Hybrid Cars: Which is Right for You?',
                'slug' => 'electric-vehicles-vs-hybrid-cars-comparison',
                'excerpt' => 'A detailed comparison between electric and hybrid vehicles to help you make an informed decision.',
                'body' => 'With the growing popularity of eco-friendly vehicles, many buyers are torn between fully electric and hybrid options. This article breaks down the pros and cons of each, helping you choose the best option for your lifestyle and budget.',
                'category_slug' => 'electric-vehicles',
                'tags' => ['electric-vehicles', 'hybrid-cars', 'technology'],
                'status' => 'published',
            ],
            [
                'title' => '2024 Automotive Industry Trends to Watch',
                'slug' => '2024-automotive-industry-trends',
                'excerpt' => 'Stay ahead of the curve with these emerging trends in the automotive world.',
                'body' => 'The automotive industry is rapidly evolving with new technologies and consumer preferences. Discover the key trends shaping 2024, from autonomous driving features to sustainable manufacturing practices.',
                'category_slug' => 'industry-news',
                'tags' => ['industry-news', 'technology'],
                'status' => 'published',
            ],
            [
                'title' => 'Understanding Vehicle Safety Ratings: What Every Buyer Should Know',
                'slug' => 'understanding-vehicle-safety-ratings',
                'excerpt' => 'A comprehensive guide to vehicle safety ratings and how to interpret them.',
                'body' => 'Safety should be a top priority when buying a vehicle. Learn about different safety rating systems, what they measure, and how to use this information to choose a safer vehicle for you and your family.',
                'category_slug' => 'safety',
                'tags' => ['safety', 'family-cars'],
                'status' => 'published',
            ],
            [
                'title' => 'Luxury Cars: Are They Worth the Premium Price?',
                'slug' => 'luxury-cars-worth-premium-price',
                'excerpt' => 'An in-depth look at luxury vehicles and whether the extra cost is justified.',
                'body' => 'Luxury cars come with premium price tags, but do they offer enough value to justify the cost? We analyze the features, performance, and ownership experience of luxury vehicles to help you decide if they\'re right for you.',
                'category_slug' => 'vehicle-reviews',
                'tags' => ['luxury', 'performance'],
                'status' => 'published',
            ],
            [
                'title' => 'Best Family Cars for 2024: Safety and Comfort Combined',
                'slug' => 'best-family-cars-2024-safety-comfort',
                'excerpt' => 'Top family vehicle recommendations focusing on safety features and comfort.',
                'body' => 'Finding the perfect family car requires balancing safety, comfort, space, and budget. We\'ve compiled a list of the best family cars for 2024 that excel in all these important categories.',
                'category_slug' => 'vehicle-reviews',
                'tags' => ['family-cars', 'safety'],
                'status' => 'published',
            ],
            [
                'title' => 'Car Financing 101: Everything You Need to Know',
                'slug' => 'car-financing-101-complete-guide',
                'excerpt' => 'A beginner\'s guide to understanding car loans, interest rates, and financing options.',
                'body' => 'Navigating car financing can be overwhelming. This guide breaks down the basics of auto loans, explains how interest rates work, and helps you understand different financing options available to car buyers.',
                'category_slug' => 'finance',
                'tags' => ['finance', 'insurance'],
                'status' => 'published',
            ],
        ];

        foreach ($posts as $postData) {
            $category = $categories->firstWhere('slug', $postData['category_slug']);
            
            if (!$category) {
                $this->command->warn("Category not found: {$postData['category_slug']}");
                continue;
            }

            $post = BlogPost::firstOrCreate(
                ['slug' => $postData['slug']],
                [
                    'blog_category_id' => $category->id,
                    'author_id' => $author->id,
                    'title' => $postData['title'],
                    'slug' => $postData['slug'],
                    'excerpt' => $postData['excerpt'],
                    'body' => $postData['body'],
                    'featured_image_path' => null,
                    'status' => $postData['status'],
                    'published_at' => $postData['status'] === 'published' ? now() : null,
                ]
            );

            // Attach tags
            foreach ($postData['tags'] as $tagName) {
                $tag = $tags->firstWhere('slug', $tagName);
                if ($tag) {
                    $post->tags()->syncWithoutDetaching([$tag->id]);
                }
            }
        }
    }
}
