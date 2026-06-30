<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StoreBlogTagRequest;
use App\Http\Requests\Blog\UpdateBlogTagRequest;
use App\Models\BlogTag;
use App\Services\Blog\BlogTagService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogTagController extends Controller
{
    public function __construct(private readonly BlogTagService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', BlogTag::class);

        return Inertia::render('Admin/Blog/Tags/Index', [
            'blogTags' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', BlogTag::class);

        return Inertia::render('Admin/Blog/Tags/Create');
    }

    public function store(StoreBlogTagRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.blog-tags.index')->with('success', 'Created successfully.');
    }

    public function show(BlogTag $blogTag): Response
    {
        $this->authorize('view', $blogTag);

        return Inertia::render('Admin/Blog/Tags/Show', [
            'blogTag' => $blogTag,
        ]);
    }

    public function edit(BlogTag $blogTag): Response
    {
        $this->authorize('update', $blogTag);

        return Inertia::render('Admin/Blog/Tags/Edit', [
            'blogTag' => $blogTag,
        ]);
    }

    public function update(UpdateBlogTagRequest $request, BlogTag $blogTag): RedirectResponse
    {
        $this->service->update($blogTag, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(BlogTag $blogTag): RedirectResponse
    {
        $this->authorize('delete', $blogTag);
        $this->service->delete($blogTag);

        return redirect()->route('admin.blog-tags.index')->with('success', 'Deleted successfully.');
    }
}
