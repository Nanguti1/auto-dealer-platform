<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreCmsPageRequest;
use App\Http\Requests\CMS\UpdateCmsPageRequest;
use App\Models\DynamicCmsPage;
use App\Services\CMS\CMSService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CmsPageController extends Controller
{
    public function __construct(private readonly CMSService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', DynamicCmsPage::class);

        return Inertia::render('Admin/CMS/Pages/Index', [
            'pages' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', DynamicCmsPage::class);

        return Inertia::render('Admin/CMS/Pages/Create');
    }

    public function store(StoreCmsPageRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.cms-pages.index')->with('success', 'Created successfully.');
    }

    public function show(DynamicCmsPage $dynamicCmsPage): Response
    {
        $this->authorize('view', $dynamicCmsPage);

        return Inertia::render('Admin/CMS/Pages/Show', [
            'dynamicCmsPage' => $dynamicCmsPage,
        ]);
    }

    public function edit(DynamicCmsPage $dynamicCmsPage): Response
    {
        $this->authorize('update', $dynamicCmsPage);

        return Inertia::render('Admin/CMS/Pages/Edit', [
            'dynamicCmsPage' => $dynamicCmsPage,
        ]);
    }

    public function update(UpdateCmsPageRequest $request, DynamicCmsPage $dynamicCmsPage): RedirectResponse
    {
        $this->service->update($dynamicCmsPage, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(DynamicCmsPage $dynamicCmsPage): RedirectResponse
    {
        $this->authorize('delete', $dynamicCmsPage);
        $this->service->delete($dynamicCmsPage);

        return redirect()->route('admin.cms-pages.index')->with('success', 'Deleted successfully.');
    }
}
