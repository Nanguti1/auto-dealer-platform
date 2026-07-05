<?php

declare(strict_types=1);

namespace App\Http\Requests\Imports;

use Illuminate\Foundation\Http\FormRequest;

class StoreImportDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'max:10240', 'mimes:pdf,doc,docx,txt,jpg,jpeg,png,csv,xlsx,xls', 'extensions:pdf,doc,docx,txt,jpg,jpeg,png,csv,xlsx,xls'],
            'type' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.mimes' => 'The file must be one of the following types: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, CSV, XLSX, XLS.',
            'file.extensions' => 'The file must have one of the following extensions: .pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .csv, .xlsx, .xls.',
            'file.max' => 'The file may not be larger than 10MB.',
        ];
    }
}
