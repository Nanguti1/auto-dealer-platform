<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\TradeIns;

use App\Http\Controllers\Controller;
use App\Http\Requests\TradeIns\StoreOfferRequest;
use App\Http\Requests\TradeIns\UpdateOfferRequest;
use App\Models\TradeInOffer;
use App\Services\TradeIns\OfferService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    public function __construct(private readonly OfferService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TradeInOffer::class);

        return Inertia::render('Admin/TradeIns/Offers/Index', [
            'offers' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TradeInOffer::class);

        return Inertia::render('Admin/TradeIns/Offers/Create');
    }

    public function store(StoreOfferRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.offers.index')->with('success', 'Offer created successfully.');
    }

    public function show(TradeInOffer $offer): Response
    {
        $this->authorize('view', $offer);

        return Inertia::render('Admin/TradeIns/Offers/Show', [
            'offer' => $offer->load(['tradeInRequest', 'valuation', 'createdBy']),
        ]);
    }

    public function edit(TradeInOffer $offer): Response
    {
        $this->authorize('update', $offer);

        return Inertia::render('Admin/TradeIns/Offers/Edit', [
            'offer' => $offer->load(['tradeInRequest', 'valuation', 'createdBy']),
        ]);
    }

    public function update(UpdateOfferRequest $request, TradeInOffer $offer): RedirectResponse
    {
        $this->service->update($offer, $request->validated());

        return back()->with('success', 'Offer updated successfully.');
    }

    public function accept(TradeInOffer $offer): RedirectResponse
    {
        $this->authorize('update', $offer);
        $this->service->accept($offer);

        return back()->with('success', 'Offer accepted successfully.');
    }

    public function reject(TradeInOffer $offer): RedirectResponse
    {
        $this->authorize('update', $offer);
        $this->service->reject($offer);

        return back()->with('success', 'Offer rejected successfully.');
    }

    public function destroy(TradeInOffer $offer): RedirectResponse
    {
        $this->authorize('delete', $offer);
        $this->service->delete($offer);

        return redirect()->route('admin.offers.index')->with('success', 'Offer deleted successfully.');
    }
}
