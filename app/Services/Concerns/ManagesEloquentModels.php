<?php

declare(strict_types=1);

namespace App\Services\Concerns;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

trait ManagesEloquentModels
{
    /**
     * @return class-string<EloquentModel>
     */
    abstract protected function modelClass(): string;

    /**
     * @param  array<string, mixed>  $filters
     */
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return $this->query($filters)->paginate($perPage)->withQueryString();
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    public function search(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return $this->paginate($filters, $perPage);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): EloquentModel
    {
        return DB::transaction(fn (): EloquentModel => $this->modelClass()::query()->create($data));
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(EloquentModel $model, array $data): EloquentModel
    {
        return DB::transaction(function () use ($model, $data): EloquentModel {
            $model->update($data);

            return $model->refresh();
        });
    }

    public function delete(EloquentModel $model): void
    {
        DB::transaction(fn (): ?bool => $model->delete());
    }

    public function restore(EloquentModel $model): EloquentModel
    {
        return DB::transaction(function () use ($model): EloquentModel {
            if (method_exists($model, 'restore')) {
                $model->restore();
            }

            return $model->refresh();
        });
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    protected function query(array $filters = []): Builder
    {
        /** @var Builder $query */
        $query = $this->modelClass()::query()->latest();

        $search = Arr::get($filters, 'search');

        $model = new ($this->modelClass());
        $searchableColumns = array_values(array_intersect(
            ['name', 'title', 'email', 'stock_number', 'vin', 'status'],
            $model->getFillable(),
        ));

        if (is_string($search) && $search !== '' && $searchableColumns !== []) {
            $query->where(function (Builder $query) use ($search, $searchableColumns): void {
                foreach ($searchableColumns as $column) {
                    $query->orWhere($column, 'like', "%{$search}%");
                }
            });
        }

        if (Arr::has($filters, 'status') && in_array('status', $model->getFillable(), true)) {
            $query->where('status', Arr::get($filters, 'status'));
        }

        return $query;
    }
}