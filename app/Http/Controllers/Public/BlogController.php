<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->query('category');

        $query = BlogPost::with(['category', 'author'])
            ->published()
            ->recent();

        if ($category) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $category));
        }

        $posts = $query->paginate(15);

        $categories = BlogCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('blog-index', [
            'posts' => $posts->items(),
            'categories' => $categories,
            'currentCategory' => $category,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::with(['category', 'author', 'tags'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedPosts = BlogPost::with(['category', 'author'])
            ->published()
            ->where('id', '!=', $post->id)
            ->where('blog_category_id', $post->blog_category_id)
            ->limit(3)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'excerpt' => $p->excerpt,
                'image' => $p->featured_image_path,
                'category' => $p->category->name ?? '',
                'publishedAt' => $p->published_at?->toDateString(),
                'author' => ['name' => $p->author->name ?? ''],
            ]);

        return Inertia::render('blog-show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'image' => $post->featured_image_path,
                'category' => $post->category->name ?? '',
                'publishedAt' => $post->published_at?->toDateString(),
                'author' => ['name' => $post->author->name ?? ''],
                'tags' => $post->tags->map(fn ($tag) => $tag->name),
            ],
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
