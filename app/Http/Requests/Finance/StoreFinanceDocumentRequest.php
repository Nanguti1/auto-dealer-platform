<?php

declare(strict_types=1);

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinanceDocumentRequest extends FormRequest
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
            'file' => ['required', 'file', 'max:10240', 'mimes:pdf,doc,docx,txt,jpg,jpeg,png', 'extensions:pdf,doc,docx,txt,jpg,jpeg,png'],
            'type' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.mimes' => 'The file must be one of the following types: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG.',
            'file.extensions' => 'The file must have one of the following extensions: .pdf, .doc, .docx, .txt, .jpg, .jpeg, .png.',
            'file.max' => 'The file may not be larger than 10MB.',
        ];
    }
}
