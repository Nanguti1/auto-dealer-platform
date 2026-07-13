<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\StoreFaqRequest;
use App\Http\Requests\CMS\UpdateFaqRequest;
use App\Models\Faq;
use App\Services\CMS\FaqService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function __construct(private readonly FaqService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Faq::class);

        return Inertia::render('Admin/CMS/FAQs/Index', [
            'faqs' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Faq::class);

        return Inertia::render('Admin/CMS/FAQs/Create');
    }

    public function store(StoreFaqRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.faqs.index')->with('success', 'Created successfully.');
    }

    public function show(Faq $faq): Response
    {
        $this->authorize('view', $faq);

        return Inertia::render('Admin/CMS/FAQs/Show', [
            'faq' => $faq,
        ]);
    }

    public function edit(Faq $faq): Response
    {
        $this->authorize('update', $faq);

        return Inertia::render('Admin/CMS/FAQs/Edit', [
            'faq' => $faq,
        ]);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $this->service->update($faq, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $this->authorize('delete', $faq);
        $this->service->delete($faq);

        return redirect()->route('admin.faqs.index')->with('success', 'Deleted successfully.');
    }
}
