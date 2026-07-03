<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = $request->get('q');

        if (! $query) {
            return Inertia::render('search-results', [
                'vehicles' => [],
                'articles' => [],
                'query' => '',
            ]);
        }

        // Search vehicles
        $vehicles = Vehicle::with(['make', 'vehicleModel', 'bodyType', 'galleries'])
            ->whereNull('sold_at')
            ->whereNotNull('listed_at')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('stock_number', 'like', "%{$query}%")
                    ->orWhere('vin', 'like', "%{$query}%")
                    ->orWhereHas('make', fn ($q) => $q->where('name', 'like', "%{$query}%"))
                    ->orWhereHas('vehicleModel', fn ($q) => $q->where('name', 'like', "%{$query}%"));
            })
            ->limit(6)
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

        // Search blog posts
        $articles = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%")
                    ->orWhere('body', 'like', "%{$query}%");
            })
            ->limit(6)
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

        return Inertia::render('search-results', [
            'vehicles' => $vehicles,
            'articles' => $articles,
            'query' => $query,
        ]);
    }
}
