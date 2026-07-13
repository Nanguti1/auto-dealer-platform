<?php

declare(strict_types=1);

namespace App\Services\Concerns;

use App\Models\CrmFollowUp;
use App\Models\CrmNote;
use App\Models\CrmTask;
use App\Models\Customer;
use App\Models\CustomerDocument;
use App\Models\CustomerNote;
use App\Models\FinanceApplication;
use App\Models\FinanceDocument;
use App\Models\ImportDocument;
use App\Models\ImportPayment;
use App\Models\ImportShipment;
use App\Models\Invoice;
use App\Models\Lead;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\Refund;
use App\Models\Review;
use App\Models\TestDriveBooking;
use App\Models\TradeInRequest;
use App\Models\Vehicle;
use App\Models\VehicleEnquiry;
use App\Models\VehicleGallery;
use App\Models\VehicleImport;
use App\Models\VehicleReservation;
use App\Models\VehicleSpecification;
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
        $query = $this->query($filters);

        // Add eager loading for common relationships based on model type
        $model = new ($this->modelClass());
        $this->applyEagerLoading($query, $model);

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Apply eager loading based on model type
     */
    protected function applyEagerLoading(Builder $query, EloquentModel $model): void
    {
        $eagerLoadMap = [
            Vehicle::class => ['make', 'vehicleModel', 'inventoryStatus'],
            Lead::class => ['crmStage', 'vehicle'],
            FinanceApplication::class => ['lender', 'vehicle'],
            VehicleReservation::class => ['vehicle'],
            Customer::class => ['user'],
        ];

        if (isset($eagerLoadMap[$model::class])) {
            $query->with($eagerLoadMap[$model::class]);
        }
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
        return DB::transaction(function () use ($data): EloquentModel {
            // Separate relationship data from model data
            $modelData = $data;
            $features = null;
            $specifications = null;

            if (isset($data['features']) && is_array($data['features'])) {
                $features = $data['features'];
                unset($modelData['features']);
            }

            if (isset($data['specifications']) && is_array($data['specifications'])) {
                $specifications = $data['specifications'];
                unset($modelData['specifications']);
            }

            // Remove non-model fields that are handled separately
            unset($modelData['save_as_draft']);
            unset($modelData['media']);

            // Handle applicant_data for FinanceApplication model
            $model = new ($this->modelClass());
            if ($model instanceof FinanceApplication && ! isset($modelData['applicant_data'])) {
                $modelData['applicant_data'] = [];
            }

            $model = $this->modelClass()::query()->create($modelData);

            // Handle features array for Vehicle model
            if ($model instanceof Vehicle && $features !== null) {
                // Filter and validate feature IDs
                $validFeatureIds = array_filter($features, fn ($id) => is_numeric($id) && $id > 0);
                $validFeatureIds = array_map('intval', $validFeatureIds);

                if (! empty($validFeatureIds)) {
                    $model->features()->sync($validFeatureIds);
                }
            }

            // Handle specifications array for Vehicle model
            if ($model instanceof Vehicle && $specifications !== null) {
                // Reindex specifications to ensure sequential keys
                $specifications = array_values($specifications);

                if (! empty($specifications)) {
                    $model->specifications()->createMany($specifications);
                }
            }

            return $model->refresh();
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(EloquentModel $model, array $data): EloquentModel
    {
        return DB::transaction(function () use ($model, $data): EloquentModel {
            // Handle features array for Vehicle model
            if ($model instanceof Vehicle && isset($data['features']) && is_array($data['features'])) {
                $features = $data['features'];
                unset($data['features']);

                // Filter and validate feature IDs
                $validFeatureIds = array_filter($features, fn ($id) => is_numeric($id) && $id > 0);
                $validFeatureIds = array_map('intval', $validFeatureIds);

                $model->features()->sync($validFeatureIds);
            }

            // Handle specifications array for Vehicle model
            if ($model instanceof Vehicle && isset($data['specifications']) && is_array($data['specifications'])) {
                $specifications = $data['specifications'];
                unset($data['specifications']);

                // Reindex specifications to ensure sequential keys
                $specifications = array_values($specifications);

                $model->specifications()->delete();
                $model->specifications()->createMany($specifications);
            }

            // Remove non-model fields that are handled separately
            unset($data['save_as_draft']);
            unset($data['media']);

            // Handle applicant_data for FinanceApplication model
            if ($model instanceof FinanceApplication && ! isset($data['applicant_data'])) {
                $data['applicant_data'] = [];
            }

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

        // Apply branch filtering if the model uses BranchAware trait
        $model = new ($this->modelClass());
        $user = auth()->user();

        if ($user !== null) {
            // Check if model has branch_id field
            if (in_array('branch_id', $model->getFillable(), true) && method_exists($model, 'scopeForBranch')) {
                $query->forBranch($user);
            }
            // Check if model has relationship to branch-aware model
            elseif (method_exists($model, 'scopeForBranchThrough')) {
                // Determine the relationship to use based on the model
                $relationship = $this->getBranchRelationship($model);
                if ($relationship !== null) {
                    $query->forBranchThrough($user, $relationship);
                }
            }
        }

        $search = Arr::get($filters, 'search');

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

    /**
     * Determine the relationship to use for branch filtering.
     */
    protected function getBranchRelationship(EloquentModel $model): ?string
    {
        // Map model classes to their branch relationships
        $relationships = [
            Lead::class => 'vehicle',
            FinanceApplication::class => 'vehicle',
            VehicleReservation::class => 'vehicle',
            VehicleImport::class => 'vehicle',
            VehicleGallery::class => 'vehicle',
            VehicleSpecification::class => 'vehicle',
            TestDriveBooking::class => 'vehicle',
            VehicleEnquiry::class => 'vehicle',
            TradeInRequest::class => 'vehicle',
            Review::class => 'vehicle',
            Payment::class => 'vehicle',
            Invoice::class => 'vehicle',
            Receipt::class => 'payment',
            Refund::class => 'payment',
            FinanceDocument::class => 'financeApplication',
            ImportDocument::class => 'vehicleImport',
            ImportShipment::class => 'vehicleImport',
            ImportPayment::class => 'vehicleImport',
            CrmTask::class => 'lead',
            CrmNote::class => 'lead',
            CrmFollowUp::class => 'lead',
            CustomerDocument::class => 'customer.user',
            CustomerNote::class => 'customer.user',
            Customer::class => 'user',
        ];

        return $relationships[$model::class] ?? null;
    }
}
