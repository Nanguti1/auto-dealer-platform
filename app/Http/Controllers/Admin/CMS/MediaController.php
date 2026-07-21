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
            'mediaFiles' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Media::class);

        return Inertia::render('Admin/CMS/Media/Upload');
    }

    public function store(StoreMediaRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.media.index')->with('success', 'Created successfully.');
    }

    public function show($id): Response
    {
        $media = Media::findOrFail($id);
        $this->authorize('view', $media);

        $mediaArray = [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'file_path' => $media->file_path,
            'file_size' => $media->file_size,
            'mime_type' => $media->mime_type,
            'path' => $media->path,
            'disk' => $media->disk,
            'alt_text' => $media->alt_text,
            'caption' => $media->caption,
            'category' => $media->category,
            'is_public' => $media->is_public,
            'created_at' => $media->created_at?->toIso8601String(),
            'updated_at' => $media->updated_at?->toIso8601String(),
        ];

        return Inertia::render('Admin/CMS/Media/Show', [
            'mediaFile' => $mediaArray,
        ]);
    }

    public function edit($id): Response
    {
        $media = Media::findOrFail($id);
        $this->authorize('update', $media);

        $mediaArray = [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'file_path' => $media->file_path,
            'file_size' => $media->file_size,
            'mime_type' => $media->mime_type,
            'path' => $media->path,
            'disk' => $media->disk,
            'alt_text' => $media->alt_text,
            'caption' => $media->caption,
            'category' => $media->category,
            'is_public' => $media->is_public,
            'created_at' => $media->created_at?->toIso8601String(),
            'updated_at' => $media->updated_at?->toIso8601String(),
        ];

        return Inertia::render('Admin/CMS/Media/Edit', [
            'mediaFile' => $mediaArray,
        ]);
    }

    public function update(UpdateMediaRequest $request, $id): RedirectResponse
    {
        $media = Media::findOrFail($id);
        $this->service->update($media, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy($id): RedirectResponse
    {
        $media = Media::findOrFail($id);
        $this->authorize('delete', $media);
        $this->service->delete($media);

        return redirect()->route('admin.media.index')->with('success', 'Deleted successfully.');
    }
}
