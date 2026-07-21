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

        $pagination = $this->service->paginate($request->query());

        // Transform the data to match the expected format
        $transformedData = collect($pagination->items())->map(function ($item) {
            return [
                'id' => $item->id,
                'seoable_type' => $item->seoable_type,
                'seoable_id' => $item->seoable_id,
                'meta_title' => $item->meta_title,
                'meta_description' => $item->meta_description,
                'canonical_url' => $item->canonical_url,
                'open_graph' => $item->open_graph,
                'schema_markup' => $item->schema_markup,
                'created_at' => $item->created_at?->toIso8601String(),
                'updated_at' => $item->updated_at?->toIso8601String(),
            ];
        })->toArray();

        $transformedPagination = [
            'data' => $transformedData,
            'meta' => [
                'current_page' => $pagination->currentPage(),
                'per_page' => $pagination->perPage(),
                'total' => $pagination->total(),
                'last_page' => $pagination->lastPage(),
            ],
        ];

        return Inertia::render('Admin/CMS/SeoMetadata/Index', [
            'seoSettings' => $transformedPagination,
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

    public function show($id): Response
    {
        $seoMetadata = SeoMetadata::findOrFail($id);
        $this->authorize('view', $seoMetadata);

        $seoArray = [
            'id' => $seoMetadata->id,
            'seoable_type' => $seoMetadata->seoable_type,
            'seoable_id' => $seoMetadata->seoable_id,
            'meta_title' => $seoMetadata->meta_title,
            'meta_description' => $seoMetadata->meta_description,
            'canonical_url' => $seoMetadata->canonical_url,
            'open_graph' => $seoMetadata->open_graph,
            'schema_markup' => $seoMetadata->schema_markup,
            'created_at' => $seoMetadata->created_at?->toIso8601String(),
            'updated_at' => $seoMetadata->updated_at?->toIso8601String(),
        ];

        return Inertia::render('Admin/CMS/SeoMetadata/Show', [
            'seoSettings' => $seoArray,
        ]);
    }

    public function edit($id): Response
    {
        $seoMetadata = SeoMetadata::findOrFail($id);
        $this->authorize('update', $seoMetadata);

        $seoArray = [
            'id' => $seoMetadata->id,
            'seoable_type' => $seoMetadata->seoable_type,
            'seoable_id' => $seoMetadata->seoable_id,
            'meta_title' => $seoMetadata->meta_title,
            'meta_description' => $seoMetadata->meta_description,
            'canonical_url' => $seoMetadata->canonical_url,
            'open_graph' => $seoMetadata->open_graph,
            'schema_markup' => $seoMetadata->schema_markup,
            'created_at' => $seoMetadata->created_at?->toIso8601String(),
            'updated_at' => $seoMetadata->updated_at?->toIso8601String(),
        ];

        return Inertia::render('Admin/CMS/SeoMetadata/Edit', [
            'seoSettings' => $seoArray,
        ]);
    }

    public function update(UpdateSeoMetadataRequest $request, $id): RedirectResponse
    {
        $seoMetadata = SeoMetadata::findOrFail($id);
        $this->service->update($seoMetadata, $request->validated());

        return redirect()->route('admin.seo-metadata.show', $id)->with('success', 'Updated successfully.');
    }

    public function destroy($id): RedirectResponse
    {
        $seoMetadata = SeoMetadata::findOrFail($id);
        $this->authorize('delete', $seoMetadata);
        $this->service->delete($seoMetadata);

        return redirect()->route('admin.seo-metadata.index')->with('success', 'Deleted successfully.');
    }
}
