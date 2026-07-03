<?php

declare(strict_types=1);

namespace App\Actions\Imports;

use App\Services\Imports\ImportService;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class CreateImportRequestAction
{
    public function __construct(private readonly ImportService $service) {}

    public function __invoke(array $data): EloquentModel
    {
        return $this->service->create($data);
    }
}
