<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Finance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Finance\StoreFinanceDocumentRequest;
use App\Models\FinanceApplication;
use App\Models\FinanceDocument;
use App\Services\Finance\FinanceDocumentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceDocumentController extends Controller
{
    public function __construct(private readonly FinanceDocumentService $service) {}

    public function index(Request $request, FinanceApplication $financeApplication): Response
    {
        $this->authorize('viewAny', FinanceDocument::class);

        return Inertia::render('Admin/Finance/Documents/Index', [
            'financeApplication' => $financeApplication,
            'documents' => $financeApplication->documents()->latest()->get(),
        ]);
    }

    public function create(FinanceApplication $financeApplication): Response
    {
        $this->authorize('create', FinanceDocument::class);

        return Inertia::render('Admin/Finance/Documents/Create', [
            'financeApplication' => $financeApplication,
        ]);
    }

    public function store(StoreFinanceDocumentRequest $request, FinanceApplication $financeApplication): RedirectResponse
    {
        $this->authorize('create', FinanceDocument::class);

        $document = new FinanceDocument(['finance_application_id' => $financeApplication->id]);
        $this->service->upload($document, $request->file('file'), $request->validated()['type']);

        return redirect()->route('admin.finance-applications.documents.index', $financeApplication)->with('success', 'Document uploaded successfully.');
    }

    public function show(FinanceApplication $financeApplication, $document): Response
    {
        $document = FinanceDocument::findOrFail($document);
        $this->authorize('view', $document);

        return Inertia::render('Admin/Finance/Documents/Show', [
            'financeApplication' => $financeApplication,
            'document' => $document,
        ]);
    }

    public function destroy(FinanceApplication $financeApplication, $document): RedirectResponse
    {
        $document = FinanceDocument::findOrFail($document);
        $this->authorize('delete', $document);
        $this->service->delete($document);

        return redirect()->route('admin.finance-applications.documents.index', $financeApplication)->with('success', 'Document deleted successfully.');
    }
}
