<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreHomePageSectionRequest;
use App\Http\Requests\CMS\UpdateHomePageSectionRequest;
use App\Models\HomePageSection;
use App\Services\CMS\HomePageSectionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomePageSectionController extends Controller
{
    public function __construct(private readonly HomePageSectionService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', HomePageSection::class);

        return Inertia::render('Admin/CMS/HomePageSections/Index', [
            'homePageSections' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', HomePageSection::class);

        return Inertia::render('Admin/CMS/HomePageSections/Create');
    }

    public function store(StoreHomePageSectionRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.home-page-sections.index')->with('success', 'Created successfully.');
    }

    public function show(HomePageSection $home_page_section): Response
    {
        $this->authorize('view', $home_page_section);

        return Inertia::render('Admin/CMS/HomePageSections/Show', [
            'homePageSection' => $home_page_section,
        ]);
    }

    public function edit(HomePageSection $home_page_section): Response
    {
        $this->authorize('update', $home_page_section);

        return Inertia::render('Admin/CMS/HomePageSections/Edit', [
            'homePageSection' => $home_page_section,
        ]);
    }

    public function update(UpdateHomePageSectionRequest $request, HomePageSection $home_page_section): RedirectResponse
    {
        $this->service->update($home_page_section, $request->validated());

        return redirect()->route('admin.home-page-sections.show', $home_page_section)->with('success', 'Updated successfully.');
    }

    public function destroy(HomePageSection $home_page_section): RedirectResponse
    {
        $this->authorize('delete', $home_page_section);
        $this->service->delete($home_page_section);

        return redirect()->route('admin.home-page-sections.index')->with('success', 'Deleted successfully.');
    }
}
