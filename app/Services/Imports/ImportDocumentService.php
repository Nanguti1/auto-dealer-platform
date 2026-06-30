<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Models\ImportDocument;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImportDocumentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return ImportDocument::class;
    }

    public function upload(ImportDocument $document, UploadedFile $file, string $type): ImportDocument
    {
        $path = $file->store('import-documents', 'public');

        $document->update([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $type,
        ]);

        return $document->fresh();
    }

    public function delete(ImportDocument $document): void
    {
        if ($document->path && Storage::disk('public')->exists($document->path)) {
            Storage::disk('public')->delete($document->path);
        }

        parent::delete($document);
    }
}
