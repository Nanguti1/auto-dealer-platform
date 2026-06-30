<?php

declare(strict_types=1);

namespace App\Services\Customers;

use App\Models\CustomerDocument;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CustomerDocumentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return CustomerDocument::class;
    }

    public function upload(CustomerDocument $document, UploadedFile $file, string $type): CustomerDocument
    {
        $path = $file->store('customer-documents', 'public');

        $document->update([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $type,
        ]);

        return $document->fresh();
    }

    public function delete(CustomerDocument $document): void
    {
        if ($document->path && Storage::disk('public')->exists($document->path)) {
            Storage::disk('public')->delete($document->path);
        }

        parent::delete($document);
    }
}
