<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasSlug
{
    /**
     * The field to generate the slug from.
     */
    protected string $slugSourceField = 'title';

    /**
     * Boot the trait.
     */
    protected static function bootHasSlug(): void
    {
        static::creating(function (Model $model) {
            $model->generateSlug();
        });

        static::updating(function (Model $model) {
            if ($model->isDirty($model->getSlugSourceField())) {
                $model->generateSlug();
            }
        });
    }

    /**
     * Get the field to generate the slug from.
     */
    protected function getSlugSourceField(): string
    {
        return property_exists($this, 'slugSourceField') ? $this->slugSourceField : 'title';
    }

    /**
     * Generate a unique slug from the source field.
     */
    protected function generateSlug(): void
    {
        $sourceField = $this->getSlugSourceField();
        $sourceValue = $this->getAttribute($sourceField);

        if (empty($sourceValue)) {
            return;
        }

        // If slug is already set and not dirty, preserve it
        if (! empty($this->slug) && ! $this->isDirty('slug')) {
            return;
        }

        $slug = Str::slug($sourceValue);
        $originalSlug = $slug;

        // Ensure uniqueness
        $counter = 1;
        while ($this->slugExists($slug)) {
            $slug = $originalSlug.'-'.$counter;
            $counter++;
        }

        $this->slug = $slug;
    }

    /**
     * Check if a slug already exists in the database.
     */
    protected function slugExists(string $slug): bool
    {
        $query = static::where('slug', $slug);

        // Exclude current record when updating
        if ($this->exists) {
            $query->where('id', '!=', $this->getKey());
        }

        // Apply soft deletes if the model uses it
        if (in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($this))) {
            $query->withTrashed();
        }

        return $query->exists();
    }
}
