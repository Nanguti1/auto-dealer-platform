<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Reviews;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reviews\StoreReviewRequest;
use App\Http\Requests\Reviews\UpdateReviewRequest;
use App\Models\Review;
use App\Services\Reviews\ReviewService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function __construct(private readonly ReviewService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Review::class);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Review::class);

        return Inertia::render('Admin/Reviews/Create');
    }

    public function store(StoreReviewRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.reviews.index')->with('success', 'Created successfully.');
    }

    public function show(Review $review): Response
    {
        $this->authorize('view', $review);

        return Inertia::render('Admin/Reviews/Show', [
            'review' => $review,
        ]);
    }

    public function edit(Review $review): Response
    {
        $this->authorize('update', $review);

        return Inertia::render('Admin/Reviews/Edit', [
            'review' => $review,
        ]);
    }

    public function update(UpdateReviewRequest $request, Review $review): RedirectResponse
    {
        $this->service->update($review, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Review $review): RedirectResponse
    {
        $this->authorize('delete', $review);
        $this->service->delete($review);

        return redirect()->route('admin.reviews.index')->with('success', 'Deleted successfully.');
    }
}
