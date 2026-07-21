<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StoreBlogCategoryRequest;
use App\Http\Requests\Blog\UpdateBlogCategoryRequest;
use App\Models\BlogCategory;
use App\Services\Blog\BlogCategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    public function __construct(private readonly BlogCategoryService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', BlogCategory::class);

        return Inertia::render('Admin/Blog/Categories/Index', [
            'blogCategories' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', BlogCategory::class);

        return Inertia::render('Admin/Blog/Categories/Create');
    }

    public function store(StoreBlogCategoryRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.blog-categories.index')->with('success', 'Created successfully.');
    }

    public function show(BlogCategory $blogCategory): Response
    {
        $this->authorize('view', $blogCategory);

        return Inertia::render('Admin/Blog/Categories/Show', [
            'blogCategory' => $blogCategory,
        ]);
    }

    public function edit(BlogCategory $blogCategory): Response
    {
        $this->authorize('update', $blogCategory);

        return Inertia::render('Admin/Blog/Categories/Edit', [
            'blogCategory' => $blogCategory,
        ]);
    }

    public function update(UpdateBlogCategoryRequest $request, BlogCategory $blogCategory): RedirectResponse
    {
        $this->service->update($blogCategory, $request->validated());

        return redirect()->route('admin.blog-categories.show', $blogCategory)->with('success', 'Updated successfully.');
    }

    public function destroy(BlogCategory $blogCategory): RedirectResponse
    {
        $this->authorize('delete', $blogCategory);
        $this->service->delete($blogCategory);

        return redirect()->route('admin.blog-categories.index')->with('success', 'Deleted successfully.');
    }
}
