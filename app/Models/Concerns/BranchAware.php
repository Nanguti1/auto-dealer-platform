<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait BranchAware
{
    /**
     * Scope a query to only include records from the user's branch.
     * Admins can see all branches.
     */
    public function scopeForBranch(Builder $query, ?Model $user = null): Builder
    {
        if ($user === null) {
            return $query;
        }

        // Admins and managers can see all branches
        if ($user->isAdmin()) {
            return $query;
        }

        // Regular users can only see their own branch
        if ($user->branch_id !== null) {
            return $query->where('branch_id', $user->branch_id);
        }

        // Users without a branch see nothing
        return $query->whereRaw('1 = 0');
    }

    /**
     * Scope a query to only include records related to the user's branch through a relationship.
     * This is for models that don't have branch_id directly but are related to models that do.
     *
     * @param  string  $relationship  The relationship to traverse (e.g., 'vehicle' or 'customer.user')
     */
    public function scopeForBranchThrough(Builder $query, ?Model $user = null, string $relationship = 'vehicle'): Builder
    {
        if ($user === null) {
            return $query;
        }

        // Admins and managers can see all branches
        if ($user->isAdmin()) {
            return $query;
        }

        // Regular users can only see records related to their own branch
        if ($user->branch_id !== null) {
            // Handle nested relationships (e.g., 'customer.user')
            if (str_contains($relationship, '.')) {
                $parts = explode('.', $relationship);
                $firstRelation = $parts[0];
                $nestedRelations = implode('.', array_slice($parts, 1));

                return $query->whereHas($firstRelation, function (Builder $q) use ($user, $nestedRelations) {
                    $q->whereHas($nestedRelations, function (Builder $nestedQ) use ($user) {
                        $nestedQ->where('branch_id', $user->branch_id);
                    });
                });
            }

            return $query->whereHas($relationship, function (Builder $q) use ($user) {
                $q->where('branch_id', $user->branch_id);
            });
        }

        // Users without a branch see nothing
        return $query->whereRaw('1 = 0');
    }

    /**
     * Check if the model belongs to the user's branch.
     * Admins can access any branch.
     */
    public function isAccessibleBy(Model $user): bool
    {
        // Admins and managers can access any branch
        if ($user->isAdmin()) {
            return true;
        }

        // Users can only access their own branch
        return $this->branch_id === $user->branch_id;
    }

    /**
     * Check if the model is accessible through a relationship.
     * This is for models that don't have branch_id directly but are related to models that do.
     */
    public function isAccessibleThrough(Model $user, string $relationship = 'vehicle'): bool
    {
        // Admins and managers can access any branch
        if ($user->isAdmin()) {
            return true;
        }

        // Handle nested relationships (e.g., 'customer.user')
        if (str_contains($relationship, '.')) {
            $parts = explode('.', $relationship);
            $related = $this;
            foreach ($parts as $part) {
                if ($related === null) {
                    return false;
                }
                $related = $related->$part;
            }

            if ($related && method_exists($related, 'isAccessibleBy')) {
                return $related->isAccessibleBy($user);
            }

            if ($related && isset($related->branch_id)) {
                return $related->branch_id === $user->branch_id;
            }

            if ($related instanceof User) {
                return $related->branch_id === $user->branch_id;
            }

            return false;
        }

        // Check if the related model belongs to the user's branch
        $related = $this->$relationship;
        if ($related && method_exists($related, 'isAccessibleBy')) {
            return $related->isAccessibleBy($user);
        }

        // Fallback to direct branch_id check if relationship has it
        if ($related && isset($related->branch_id)) {
            return $related->branch_id === $user->branch_id;
        }

        // Special case: if relationship is 'user', check user's branch
        if ($relationship === 'user' && $related instanceof User) {
            return $related->branch_id === $user->branch_id;
        }

        return false;
    }
}
