<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreMediaRequest;
use App\Http\Requests\CMS\UpdateMediaRequest;
use App\Models\Media;
use App\Services\CMS\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(private readonly MediaService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Media::class);

        return Inertia::render('Admin/CMS/Media/Index', [
            'media' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Media::class);

        return Inertia::render('Admin/CMS/Media/Create');
    }

    public function store(StoreMediaRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.media.index')->with('success', 'Created successfully.');
    }

    public function show(Media $media): Response
    {
        $this->authorize('view', $media);

        return Inertia::render('Admin/CMS/Media/Show', [
            'media' => $media,
        ]);
    }

    public function edit(Media $media): Response
    {
        $this->authorize('update', $media);

        return Inertia::render('Admin/CMS/Media/Edit', [
            'media' => $media,
        ]);
    }

    public function update(UpdateMediaRequest $request, Media $media): RedirectResponse
    {
        $this->service->update($media, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Media $media): RedirectResponse
    {
        $this->authorize('delete', $media);
        $this->service->delete($media);

        return redirect()->route('admin.media.index')->with('success', 'Deleted successfully.');
    }
}
