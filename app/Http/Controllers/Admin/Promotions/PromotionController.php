<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Promotions;

use App\Events\PromotionCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Promotions\StorePromotionRequest;
use App\Http\Requests\Promotions\UpdatePromotionRequest;
use App\Models\Promotion;
use App\Services\Promotions\PromotionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PromotionController extends Controller
{
    public function __construct(private readonly PromotionService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Promotion::class);

        return Inertia::render('Admin/Marketing/Promotions/Index', [
            'promotions' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Promotion::class);

        return Inertia::render('Admin/Marketing/Promotions/Create');
    }

    public function store(StorePromotionRequest $request): RedirectResponse
    {
        $promotion = $this->service->create($request->validated());

        event(new PromotionCreated($promotion));

        return redirect()->route('admin.promotions.index')->with('success', 'Created successfully.');
    }

    public function show(Promotion $promotion): Response
    {
        $this->authorize('view', $promotion);

        $promotion->load(['vehicles']);

        return Inertia::render('Admin/Marketing/Promotions/Show', [
            'promotion' => $promotion,
        ]);
    }

    public function edit(Promotion $promotion): Response
    {
        $this->authorize('update', $promotion);

        $promotion->load(['vehicles']);

        return Inertia::render('Admin/Marketing/Promotions/Edit', [
            'promotion' => $promotion,
        ]);
    }

    public function update(UpdatePromotionRequest $request, $id): RedirectResponse
    {
        $promotion = Promotion::findOrFail($id);
        $this->service->update($promotion, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Promotion $promotion): RedirectResponse
    {
        $this->authorize('delete', $promotion);
        $this->service->delete($promotion);

        return redirect()->route('admin.promotions.index')->with('success', 'Deleted successfully.');
    }
}
