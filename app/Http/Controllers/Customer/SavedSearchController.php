<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\SavedSearch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SavedSearchController extends Controller
{
    public function index(): Response
    {
        $searches = auth()->user()
            ->savedSearches()
            ->recent()
            ->get()
            ->map(fn ($search) => [
                'id' => $search->id,
                'name' => $search->name,
                'filters' => $search->filters,
                'notifyOnMatch' => $search->notify_on_match,
                'createdAt' => $search->created_at->toISOString(),
            ]);

        return Inertia::render('customer/saved-searches', [
            'searches' => $searches,
        ]);
    }

    public function store(Request $request): void
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'filters' => ['required', 'array'],
            'notify_on_match' => ['boolean'],
        ]);

        auth()->user()->savedSearches()->create([
            'name' => $request->name,
            'filters' => $request->filters,
            'notify_on_match' => $request->boolean('notify_on_match', false),
        ]);
    }

    public function destroy(SavedSearch $savedSearch): void
    {
        $this->authorize('delete', $savedSearch);

        $savedSearch->delete();
    }
}
