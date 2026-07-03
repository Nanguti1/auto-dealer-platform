<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\HeroSlider;
use App\Models\Testimonial;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Get featured vehicles
        $featuredVehicles = Vehicle::with(['make', 'vehicleModel', 'bodyType', 'galleries'])
            ->where('is_featured', true)
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->limit(3)
            ->get()
            ->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'name' => $vehicle->title,
                'brand' => $vehicle->make->name ?? '',
                'model' => $vehicle->vehicleModel->name ?? '',
                'year' => $vehicle->year,
                'price' => (float) $vehicle->sale_price,
                'mileage' => $vehicle->mileage,
                'fuelType' => $vehicle->fuelType->name ?? '',
                'transmission' => $vehicle->transmissionType->name ?? '',
                'bodyType' => $vehicle->bodyType->name ?? '',
                'image' => $vehicle->galleries->first()?->path ?? '',
                'condition' => $vehicle->vehicleCondition->slug ?? '',
                'featured' => $vehicle->is_featured,
                'stockNumber' => $vehicle->stock_number,
                'vin' => $vehicle->vin,
                'msrp' => $vehicle->msrp ? (float) $vehicle->msrp : null,
                'color' => $vehicle->color->name ?? '',
                'interiorColor' => $vehicle->interiorColor->name ?? '',
            ]);

        // Get latest arrivals
        $latestArrivals = Vehicle::with(['make', 'vehicleModel', 'bodyType', 'galleries'])
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->orderBy('listed_at', 'desc')
            ->limit(3)
            ->get()
            ->map(fn ($vehicle) => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'name' => $vehicle->title,
                'brand' => $vehicle->make->name ?? '',
                'model' => $vehicle->vehicleModel->name ?? '',
                'year' => $vehicle->year,
                'price' => (float) $vehicle->sale_price,
                'mileage' => $vehicle->mileage,
                'fuelType' => $vehicle->fuelType->name ?? '',
                'transmission' => $vehicle->transmissionType->name ?? '',
                'bodyType' => $vehicle->bodyType->name ?? '',
                'image' => $vehicle->galleries->first()?->path ?? '',
                'condition' => $vehicle->vehicleCondition->slug ?? '',
                'featured' => $vehicle->is_featured,
                'stockNumber' => $vehicle->stock_number,
                'vin' => $vehicle->vin,
                'msrp' => $vehicle->msrp ? (float) $vehicle->msrp : null,
                'color' => $vehicle->color->name ?? '',
                'interiorColor' => $vehicle->interiorColor->name ?? '',
            ]);

        // Get hero sliders from CMS
        $heroSliders = HeroSlider::active()
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($slider) => [
                'id' => $slider->id,
                'title' => $slider->title,
                'subtitle' => $slider->subtitle,
                'image' => $slider->image_path,
                'ctaLabel' => $slider->cta_label,
                'ctaUrl' => $slider->cta_url,
            ]);

        // Get testimonials from CMS
        $testimonials = Testimonial::active()
            ->orderBy('sort_order')
            ->limit(3)
            ->get()
            ->map(fn ($testimonial) => [
                'id' => $testimonial->id,
                'name' => $testimonial->name,
                'role' => $testimonial->position,
                'rating' => $testimonial->rating,
                'content' => $testimonial->body,
                'avatar' => $testimonial->avatar_path,
            ]);

        // Get latest blog posts from CMS
        $latestBlogs = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get()
            ->map(fn ($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'image' => $post->featured_image_path,
                'category' => $post->category->name ?? '',
                'publishedAt' => $post->published_at?->toDateString(),
                'readTime' => '5 min read',
                'author' => ['name' => $post->author->name ?? ''],
            ]);

        return Inertia::render('welcome', [
            'featuredVehicles' => $featuredVehicles,
            'latestArrivals' => $latestArrivals,
            'heroSliders' => $heroSliders,
            'testimonials' => $testimonials,
            'latestBlogs' => $latestBlogs,
        ]);
    }
}
