<?php

declare(strict_types=1);

namespace App\Actions\Imports;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Services\Imports\ImportService;

class CreateImportRequestAction
{
    public function __construct(private readonly ImportService $service)
    {
    }

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
