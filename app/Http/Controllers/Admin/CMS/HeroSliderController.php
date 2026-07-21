<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreHeroSliderRequest;
use App\Http\Requests\CMS\UpdateHeroSliderRequest;
use App\Models\HeroSlider;
use App\Services\CMS\HeroSliderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HeroSliderController extends Controller
{
    public function __construct(private readonly HeroSliderService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', HeroSlider::class);

        return Inertia::render('Admin/CMS/HeroSliders/Index', [
            'heroSliders' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', HeroSlider::class);

        return Inertia::render('Admin/CMS/HeroSliders/Create');
    }

    public function store(StoreHeroSliderRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.hero-sliders.index')->with('success', 'Created successfully.');
    }

    public function show(HeroSlider $heroSlider): Response
    {
        $this->authorize('view', $heroSlider);

        return Inertia::render('Admin/CMS/HeroSliders/Show', [
            'heroSlider' => $heroSlider,
        ]);
    }

    public function edit(HeroSlider $heroSlider): Response
    {
        $this->authorize('update', $heroSlider);

        return Inertia::render('Admin/CMS/HeroSliders/Edit', [
            'heroSlider' => $heroSlider,
        ]);
    }

    public function update(UpdateHeroSliderRequest $request, HeroSlider $heroSlider): RedirectResponse
    {
        $this->service->update($heroSlider, $request->validated());

        return redirect()->route('admin.hero-sliders.show', $heroSlider)->with('success', 'Updated successfully.');
    }

    public function destroy(HeroSlider $heroSlider): RedirectResponse
    {
        $this->authorize('delete', $heroSlider);
        $this->service->delete($heroSlider);

        return redirect()->route('admin.hero-sliders.index')->with('success', 'Deleted successfully.');
    }
}
