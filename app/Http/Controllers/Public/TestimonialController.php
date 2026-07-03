<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::active()
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($testimonial) => [
                'id' => $testimonial->id,
                'name' => $testimonial->name,
                'role' => $testimonial->position,
                'rating' => $testimonial->rating,
                'content' => $testimonial->body,
                'avatar' => $testimonial->avatar_path,
            ]);

        return Inertia::render('public/testimonials', [
            'testimonials' => $testimonials,
        ]);
    }
}
