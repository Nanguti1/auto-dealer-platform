<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreSeoMetadataRequest;
use App\Http\Requests\CMS\UpdateSeoMetadataRequest;
use App\Models\SeoMetadata;
use App\Services\CMS\SeoMetadataService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SeoMetadataController extends Controller
{
    public function __construct(private readonly SeoMetadataService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', SeoMetadata::class);

        return Inertia::render('Admin/CMS/SeoMetadata/Index', [
            'seoSettings' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', SeoMetadata::class);

        return Inertia::render('Admin/CMS/SeoMetadata/Create');
    }

    public function store(StoreSeoMetadataRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.seo-metadata.index')->with('success', 'Created successfully.');
    }

    public function show(SeoMetadata $seoMetadata): Response
    {
        $this->authorize('view', $seoMetadata);

        return Inertia::render('Admin/CMS/SeoMetadata/Show', [
            'seoMetadata' => $seoMetadata,
        ]);
    }

    public function edit(SeoMetadata $seoMetadata): Response
    {
        $this->authorize('update', $seoMetadata);

        return Inertia::render('Admin/CMS/SeoMetadata/Edit', [
            'seoMetadata' => $seoMetadata,
        ]);
    }

    public function update(UpdateSeoMetadataRequest $request, SeoMetadata $seoMetadata): RedirectResponse
    {
        $this->service->update($seoMetadata, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(SeoMetadata $seoMetadata): RedirectResponse
    {
        $this->authorize('delete', $seoMetadata);
        $this->service->delete($seoMetadata);

        return redirect()->route('admin.seo-metadata.index')->with('success', 'Deleted successfully.');
    }
}
