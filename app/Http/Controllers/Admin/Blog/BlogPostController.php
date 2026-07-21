<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StoreBlogPostRequest;
use App\Http\Requests\Blog\UpdateBlogPostRequest;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Services\Blog\BlogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function __construct(private readonly BlogService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', BlogPost::class);

        return Inertia::render('Admin/Blog/Posts/Index', [
            'blogPosts' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', BlogPost::class);

        $categories = BlogCategory::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'label' => $category->name,
                ];
            });

        return Inertia::render('Admin/Blog/Posts/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreBlogPostRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.blog-posts.index')->with('success', 'Created successfully.');
    }

    public function show($id): Response
    {
        $blogPost = BlogPost::with(['category', 'author'])->findOrFail($id);
        $this->authorize('view', $blogPost);

        return Inertia::render('Admin/Blog/Posts/Show', [
            'blogPost' => $blogPost,
        ]);
    }

    public function edit($id): Response
    {
        $blogPost = BlogPost::with(['category', 'author'])->findOrFail($id);
        $this->authorize('update', $blogPost);

        $categories = BlogCategory::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'label' => $category->name,
                ];
            });

        return Inertia::render('Admin/Blog/Posts/Edit', [
            'blogPost' => $blogPost,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateBlogPostRequest $request, $id): RedirectResponse
    {
        $blogPost = BlogPost::findOrFail($id);
        $this->service->update($blogPost, $request->validated());

        return redirect()->route('admin.blog-posts.show', $id)->with('success', 'Updated successfully.');
    }

    public function destroy($id): RedirectResponse
    {
        $blogPost = BlogPost::findOrFail($id);
        $this->authorize('delete', $blogPost);
        $this->service->delete($blogPost);

        return redirect()->route('admin.blog-posts.index')->with('success', 'Deleted successfully.');
    }
}
