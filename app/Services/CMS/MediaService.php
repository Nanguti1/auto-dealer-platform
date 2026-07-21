<?php

declare(strict_types=1);

namespace App\Services\CMS;

use App\Models\Media;
use App\Services\Concerns\ManagesEloquentModels;
use Illuminate\Http\UploadedFile;

class MediaService
{
    use ManagesEloquentModels {
        create as traitCreate;
    }

    protected function modelClass(): string
    {
        return Media::class;
    }

    public function create(array $data): Media
    {
        $file = $data['file'] ?? null;
        unset($data['file']);

        if ($file instanceof UploadedFile) {
            $path = $file->store('media', 'public');
            $data['file_name'] = $file->getClientOriginalName();
            $data['mime_type'] = $file->getMimeType();
            $data['file_size'] = $file->getSize();
            $data['path'] = $path;
            $data['disk'] = 'public';
            $data['name'] = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        }

        return $this->traitCreate($data);
    }
}
