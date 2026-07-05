<?php

declare(strict_types=1);

namespace App\Services\Customers;

use App\Models\CustomerDocument;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CustomerDocumentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return CustomerDocument::class;
    }

    public function upload(CustomerDocument $document, UploadedFile $file, string $type): CustomerDocument
    {
        $sanitizedFilename = $this->sanitizeFilename($file->getClientOriginalName());
        $path = $file->storeAs('customer-documents', $sanitizedFilename, 'public');

        $document->update([
            'name' => $sanitizedFilename,
            'path' => $path,
            'type' => $type,
        ]);

        return $document->fresh();
    }

    public function delete(CustomerDocument $document): void
    {
        DB::transaction(function () use ($document): void {
            if ($document->path && Storage::disk('public')->exists($document->path)) {
                Storage::disk('public')->delete($document->path);
            }

            $document->delete();
        });
    }

    protected function sanitizeFilename(string $filename): string
    {
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $name = pathinfo($filename, PATHINFO_FILENAME);

        $sanitized = Str::slug($name, '_');
        $sanitized = preg_replace('/[^a-zA-Z0-9_-]/', '', $sanitized);

        if (empty($sanitized)) {
            $sanitized = 'file_'.time();
        }

        return $sanitized.'.'.$extension;
    }
}
