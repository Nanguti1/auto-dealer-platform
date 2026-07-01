<?php

declare(strict_types=1);

namespace App\Services\Financing;

use App\Models\FinanceDocument;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FinanceDocumentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return FinanceDocument::class;
    }

    public function upload(FinanceDocument $document, UploadedFile $file, string $type): FinanceDocument
    {
        $path = $file->store('finance-documents', 'public');

        $document->update([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $type,
        ]);

        return $document->fresh();
    }

    public function delete(FinanceDocument $document): void
    {
        DB::transaction(function () use ($document): void {
            if ($document->path && Storage::disk('public')->exists($document->path)) {
                Storage::disk('public')->delete($document->path);
            }

            $document->delete();
        });
    }
}
