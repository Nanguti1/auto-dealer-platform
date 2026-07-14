<?php

declare(strict_types=1);

namespace App\Services\Imports;

use App\Models\ImportDocument;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportDocumentService
{
    use ManagesEloquentModels;

    protected function modelClass(): string
    {
        return ImportDocument::class;
    }

    public function upload(ImportDocument $document, UploadedFile $file, string $type): ImportDocument
    {
        $sanitizedFilename = $this->sanitizeFilename($file->getClientOriginalName());
        $path = $file->storeAs('import-documents', $sanitizedFilename, 'public');

        $document->update([
            'name' => $sanitizedFilename,
            'path' => $path,
            'type' => $type,
        ]);

        return $document->fresh();
    }

    public function update(ImportDocument $document, array $data, ?UploadedFile $file = null): ImportDocument
    {
        DB::transaction(function () use ($document, $data, $file): void {
            // Update metadata
            if (isset($data['name'])) {
                $document->name = $data['name'];
            }
            if (isset($data['type'])) {
                $document->type = $data['type'];
            }

            // Handle file replacement if provided
            if ($file) {
                $this->delete($document);
                $this->upload($document, $file, $document->type);
            } else {
                $document->save();
            }
        });

        return $document->fresh();
    }

    public function delete(ImportDocument $document): void
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
