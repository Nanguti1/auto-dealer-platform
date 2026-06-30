<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Imports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Imports\StoreImportDocumentRequest;
use App\Models\ImportDocument;
use App\Models\VehicleImport;
use App\Services\Imports\ImportDocumentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportDocumentController extends Controller
{
    public function __construct(private readonly ImportDocumentService $service) {}

    public function index(Request $request, VehicleImport $vehicleImport): Response
    {
        $this->authorize('viewAny', ImportDocument::class);

        return Inertia::render('Admin/Imports/Documents/Index', [
            'vehicleImport' => $vehicleImport,
            'documents' => $vehicleImport->documents()->latest()->get(),
        ]);
    }

    public function create(VehicleImport $vehicleImport): Response
    {
        $this->authorize('create', ImportDocument::class);

        return Inertia::render('Admin/Imports/Documents/Create', [
            'vehicleImport' => $vehicleImport,
        ]);
    }

    public function store(StoreImportDocumentRequest $request, VehicleImport $vehicleImport): RedirectResponse
    {
        $this->authorize('create', ImportDocument::class);

        $document = new ImportDocument(['vehicle_import_id' => $vehicleImport->id]);
        $this->service->upload($document, $request->file('file'), $request->validated()['type']);

        return redirect()->route('admin.imports.documents.index', $vehicleImport)->with('success', 'Document uploaded successfully.');
    }

    public function show(VehicleImport $vehicleImport, $document): Response
    {
        $document = ImportDocument::findOrFail($document);
        $this->authorize('view', $document);

        return Inertia::render('Admin/Imports/Documents/Show', [
            'vehicleImport' => $vehicleImport,
            'document' => $document,
        ]);
    }

    public function destroy(VehicleImport $vehicleImport, $document): RedirectResponse
    {
        $document = ImportDocument::findOrFail($document);
        $this->authorize('delete', $document);
        $this->service->delete($document);

        return redirect()->route('admin.imports.documents.index', $vehicleImport)->with('success', 'Document deleted successfully.');
    }
}
